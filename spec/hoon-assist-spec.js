'use babel';

import HoonAssist from '../lib/hoon-assist';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('HoonAssist', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('hoon-assist');
  });

  describe('when the hoon-assist:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.hoon-assist')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'hoon-assist:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.hoon-assist')).toExist();

        let hoonAssistElement = workspaceElement.querySelector('.hoon-assist');
        expect(hoonAssistElement).toExist();

        let hoonAssistPanel = atom.workspace.panelForItem(hoonAssistElement);
        expect(hoonAssistPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'hoon-assist:toggle');
        expect(hoonAssistPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.hoon-assist')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'hoon-assist:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let hoonAssistElement = workspaceElement.querySelector('.hoon-assist');
        expect(hoonAssistElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'hoon-assist:toggle');
        expect(hoonAssistElement).not.toBeVisible();
      });
    });
  });
});
