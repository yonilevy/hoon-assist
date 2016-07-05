'use babel';

import HoonAssistView from './hoon-assist-view';
import { CompositeDisposable } from 'atom';

export default {

  assistView: null,
  assistPanel: null,
  subscriptions: null,
  subscribedToEditors: [],
  isOn: false,

  activate(state) {
    this.assistView = new HoonAssistView();
    this.assistPanel = atom.workspace.addBottomPanel({
      item: this.assistView.getElement(),
      visible: false
    });

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'hoon-assist:toggle': () => this.toggle()
    }));
    this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem(
      () => this.subscribeToCurrentEditorIfRelevant()
    ));

    this.subscribeToCurrentEditorIfRelevant();
  },

  deactivate() {
    this.assistPanel.destroy();
    this.subscriptions.dispose();
    this.assistView.destroy();
  },

  subscribeToCurrentEditorIfRelevant() {
    const editor = atom.workspace.getActiveTextEditor();
    if (this.subscribedToEditors.indexOf(editor) == -1 && this.isHoonEditor(editor)) {
      this.subscribeToCursorChangesOnEditor(editor);
    }
    this.showOrHideAssistPanel();
  },

  isHoonEditor(editor) {
    return editor.getGrammar().scopeName == "source.hoon";
  },

  subscribeToCursorChangesOnEditor(editor) {
    this.subscriptions.add(editor.onDidChangeCursorPosition(function() {
      // TODO: find word under cursor.
    }));
    this.subscribedToEditors.push(editor);
  },

  toggle() {
    this.isOn = !this.isOn;
    this.showOrHideAssistPanel();
  },

  showOrHideAssistPanel() {
    if (this.isOn && this.isHoonEditor(atom.workspace.getActiveTextEditor())) {
      this.assistPanel.show();
    } else {
      this.assistPanel.hide();
    }
  }

};
