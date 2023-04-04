import { addCopyButton, addExportButton, setupSidebar } from "./button_functions";
import { insertPromptTemplatesSection } from "./template_functions";

// This function is called for each new element added to the document body
export function handleElementAdded(e: any) {
  // If the element added is the root element for the chat sidebar, set up the sidebar
  if (e.id === 'headlessui-portal-root') {
    setupSidebar();
    return;
  }

  // Disable "Export Button" when no chat were started.
  // Insert "Prompt Templates" section to the main page.
  if (e.querySelector('h1.text-4xl')) {
    insertPromptTemplatesSection();
    const button = document.getElementById('export-button');
    if (button) {
            button.style = 'pointer-events: none;opacity: 0.5';
    }  
  }

  // Enable "Export Button" when a new chat started.
  if (document.querySelector('.xl\\:max-w-3xl')) {
    const button = document.getElementById('export-button');
    if (button) {
            button.style = '';
    }
  }

  // Add "Copy Button" to Assistant's chat bubble.
  if (e.querySelector('.lg\\:self-center.lg\\:pl-2')) {
    // Get buttons group
    const buttonGroup = e.querySelector('.lg\\:self-center.lg\\:pl-2');
    // Filter out Assistant's chat bubble from User's chat bubble
    if (buttonGroup.children.length !== 2)
      return;
    // It heavily depends on the fact Assistant's has two buttons, "upvote" and "downvote".
    // and the user has only one button, "edit prompt".
    addCopyButton(buttonGroup);
  }

}

export function setupObserver() {
  const observer = new MutationObserver(mutations => {
    // For each mutation (change) to the document body
    mutations.forEach(mutation => {
      // If the mutation is not a change to the list of child nodes, skip it
      if (mutation.removedNodes.length) {
        mutation.removedNodes.forEach((node) => {
                    const exportButton = [...node.children].find(
            (child) => child.innerText &&
              child.innerText.toLowerCase().includes("export")
          );
          if (exportButton) {
            setTimeout(addExportButton, 500);
          }
        });
      }
      if (mutation.type !== 'childList')
        // If no new nodes were added, skip this mutation
        if (mutation.addedNodes.length == 0)
          return;
      // Get the first added node
      const node = mutation.addedNodes[0];
      // If the node is not an element or does not have a `querySelector` method, skip it
            if (!node || !node.querySelector)
        return;
      // Call the `handleElementAdded` function with the added node
      handleElementAdded(node);
    });
  });
  // Start observing the document body for changes
  observer.observe(document.body, { subtree: true, childList: true });
}

