import View from './View.js';
import { getTimeString } from '../utils/timeUtils.js';

class AlarmListView extends View {
  constructor(el) {
    super(el);
    this.alarmListEl = this.el.querySelector('.alarm-list');
  }

  addAlarm = (alarmData) => {
    console.log('added alarm');
    const { id, clockMode, timestamp, alarmMode, content } = alarmData;
    const timeString = getTimeString(timestamp);

    const alarmEl = document.createElement('li');
    alarmEl.id = `alarm-${id}`;
    alarmEl.className = 'alarm';
    this.alarmListEl.appendChild(alarmEl);

    const timeEl = document.createElement('span');
    timeEl.className = 'time';
    timeEl.innerText = timeString;
    alarmEl.appendChild(timeEl);

    const contentEl = document.createElement('span');
    contentEl.className = 'content';
    contentEl.innerText = content;
    alarmEl.appendChild(contentEl);

    const btnOffEl = document.createElement('button');
    btnOffEl.className = 'btn-off';
    btnOffEl.innerText = '끄기';
    btnOffEl.addEventListener('click', () => this.onBtnOffClick(id));
    alarmEl.appendChild(btnOffEl);

    const btnRemoveEl = document.createElement('button');
    btnRemoveEl.className = 'btn-remove';
    btnRemoveEl.innerText = '삭제';
    btnRemoveEl.addEventListener('click', () => this.onBtnRemoveClick(id));
    alarmEl.appendChild(btnRemoveEl);
  };

  removeAlarm = (id) => {
    const targetAlarmEl = this.alarmListEl.querySelector(`#alarm-${id}`);
    this.alarmListEl.removeChild(targetAlarmEl);
  };

  onBtnOffClick = (id) => {
    this.emit('@alarmOff', { id });
  };

  onBtnRemoveClick = (id) => {
    this.emit('@alarmRemove', { id });
  };
}

export default AlarmListView;
