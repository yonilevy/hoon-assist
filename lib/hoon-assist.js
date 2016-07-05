'use babel';

import HoonAssistView from './hoon-assist-view';
import { CompositeDisposable } from 'atom';

export default {

  hoonAssistView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hoonAssistView = new HoonAssistView();
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.hoonAssistView.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hoon-assist:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.hoonAssistView.destroy();
  },

  toggle() {
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
