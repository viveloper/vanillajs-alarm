class View {
  constructor(el) {
    this.el = el;
  }

  on(eventName, eventHandler) {
    this.el.addEventListener(eventName, eventHandler);
  }

  emit(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    this.el.dispatchEvent(event);
  }
}

export default View;
