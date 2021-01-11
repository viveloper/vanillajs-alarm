import View from './View.js';

class HeaderView extends View {
  constructor(el) {
    super(el);
    this.currentTimeEl = this.el.querySelector('.current-time');
  }

  setCurrentTime(time) {
    this.currentTimeEl.innerText = time;
  }
}

export default HeaderView;
