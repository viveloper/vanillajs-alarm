import View from './View.js';

class AlarmRegisterView extends View {
  constructor(el) {
    super(el);

    this.alarmRegisterFormEl = this.el.querySelector('.alarm-register-form');
    this.clockModeEl = this.el.querySelector('#clock-mode');
    this.timeConfigEl = this.el.querySelector('#time-config');
    flatpickr(this.timeConfigEl, {
      enableTime: true,
      dateFormat: 'Y-m-d H:i',
    });
    this.alarmModeEl = this.el.querySelector('#alarm-mode');
    this.inputContentEl = this.el.querySelector('#input-content');

    this.bindEvents();
  }

  bindEvents() {
    this.alarmRegisterFormEl.addEventListener('submit', this.onSubmit);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const id = Date.now();
    const clockMode = this.clockModeEl.value;
    const timestamp = new Date(this.timeConfigEl.value).getTime();
    const alarmMode = this.alarmModeEl.value;
    const content = this.inputContentEl.value;

    if (Number.isNaN(timestamp)) {
      alert('알람 시간을 설정하세요');
      return;
    }
    if (content.length === 0) {
      alert('알람 내용을 입력하세요');
      return;
    }

    const alarmData = { id, clockMode, timestamp, alarmMode, content };
    this.emit('@alarmSubmit', { alarmData });

    this.clearForm();
  };

  clearForm = () => {
    this.clockModeEl.value = 'normal';
    this.timeConfigEl.value = '';
    this.alarmModeEl.value = 'normal';
    this.inputContentEl.value = '';
  };
}

export default AlarmRegisterView;
