'use babel';

import HoonAssistView from './hoon-assist-view';
import { CompositeDisposable } from 'atom';

export default {

  hoonAssistView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.hoonAssistView = new HoonAssistView(state.hoonAssistViewState);
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.hoonAssistView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hoon-assist:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.hoonAssistView.destroy();
  },

  serialize() {
    return {
      hoonAssistViewState: this.hoonAssistView.serialize()
    };
  },

  toggle() {
    console.log('HoonAssist was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
