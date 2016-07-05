'use babel';

export default class HoonAssistView {

  constructor() {
    this.term = null;

    this.element = document.createElement('div');
    this.element.classList.add('hoon-assist');

    this.assistPanel = document.createElement('div');
    this.assistPanel.innerHTML = this.defaultHtml();
    this.assistPanel.classList.add('assist-panel');
    this.element.appendChild(this.assistPanel);
  }

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  updateContents(term, html) {
    this.term = term;
    this.assistPanel.innerHTML = html || this.defaultHtml();
    this.assistPanel.scrollTop = 0;
  }

  defaultHtml() {
    return "<h4>Hoon Assist</h4><p>Move cursor over Hoon term for documentation.</p>"
  }

}
