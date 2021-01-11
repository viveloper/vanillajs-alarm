import View from './View.js';
import { getTimeString } from '../utils/timeUtils.js';

class AlarmMessageView extends View {
  constructor(el) {
    super(el);
    this.alarmMessageEl = this.el.querySelector('#alarm-message');
  }

  addAlarmMessage = (alarmData) => {
    console.log('added message');
    const { id, clockMode, timestamp, alarmMode, content } = alarmData;
    const timeString = getTimeString(timestamp);

    let message = '';
    if (clockMode === 'night') {
      if (alarmMode === 'emergency') {
        message = `${timeString} ${content} 소리알림! \n`;
      }
    } else if (clockMode === 'normal') {
      message = `${timeString} ${content} 소리알림! \n`;
    } else if (clockMode === 'vibration') {
      message = `${timeString} ${content} 진동알림! \n`;
    }

    if (message === '') return;

    this.alarmMessageEl.value += message;
  };
}

export default AlarmMessageView;
