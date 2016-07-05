'use babel';

export default class HoonAssistView {

  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('hoon-assist');

    const assistPanel = document.createElement('div');
    assistPanel.innerHTML = "<h1>This is some</h1><h2>HTML!</h2><br>"
    assistPanel.classList.add('assist-panel');
    this.element.appendChild(assistPanel);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
