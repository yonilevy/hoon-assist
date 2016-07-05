'use babel';

export default class HoonAssistView {

  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('hoon-assist');

    const assistPanel = document.createElement('div');
    assistPanel.innerHTML = "<h1>This is some</h1><h2>HTML!</h2><br>"
    assistPanel.classList.add('assist-panel');
    this.element.appendChild(assistPanel);
  }

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
