import HeaderView from '../views/HeaderView.js';
import AlarmRegisterView from '../views/AlarmRegisterView.js';
import AlarmListView from '../views/AlarmListView.js';
import AlarmMessageView from '../views/AlarmMessageView.js';

class MainController {
  constructor() {
    console.log('MainController');
    this.HeaderView = new HeaderView(document.querySelector('.header'));
    this.AlarmRegisterView = new AlarmRegisterView(
      document.querySelector('.section-alarm-register')
    );
    this.AlarmListView = new AlarmListView(
      document.querySelector('.section-alarm-list')
    );
    this.AlarmMessageView = new AlarmMessageView(
      document.querySelector('.section-message')
    );

    this.currentTimeTimer = null;
    this.timeCheckTimerMap = {};
    this.alarmMap = {};

    this.bindEvents();

    this.init();
  }

  init() {
    this.HeaderView.setCurrentTime(new Date(Date.now()).toLocaleString());
    this.currentTimeTimer = setInterval(() => {
      this.HeaderView.setCurrentTime(new Date(Date.now()).toLocaleString());
    }, 1000);
  }

  bindEvents() {
    this.AlarmRegisterView.on('@alarmSubmit', this.onAlarmSubmit);
    this.AlarmListView.on('@alarmOff', this.onAlarmOff);
    this.AlarmListView.on('@alarmRemove', this.onAlarmRemove);
  }

  onAlarmSubmit = (e) => {
    const { alarmData } = e.detail;

    this.alarmMap[alarmData.id] = alarmData;
    this.AlarmListView.addAlarm(alarmData);
    this.timeCheckTimerMap[alarmData.id] = setInterval(() => {
      const currentTimestamp = Date.now();
      if (alarmData.timestamp <= currentTimestamp) {
        this.AlarmMessageView.addAlarmMessage(alarmData);
      }
    }, 1000);
  };

  onAlarmOff = (e) => {
    const { id } = e.detail;

    clearInterval(this.timeCheckTimerMap[id]);
    delete this.timeCheckTimerMap[id];
  };

  onAlarmRemove = (e) => {
    const { id } = e.detail;

    clearInterval(this.timeCheckTimerMap[id]);
    delete this.timeCheckTimerMap[id];

    this.AlarmListView.removeAlarm(id);
    delete this.alarmMap[id];
  };
}

export default MainController;
