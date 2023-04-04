// This function sets up the chat sidebar by adding an "Export Button" and modifying

import { css } from "./css";
import { exportCurrentChat } from "./exportCurrentChat";
import { svg } from "./svg";
import { selectPromptTemplate } from "./template_functions";

// the "New Chat" buttons to clear the selected prompt template when clicked
export function setupSidebar() {
  // Add the "Export Button" to the sidebar
  addExportButton();
  // Get the "New Chat" buttons
  const buttons = getNewChatButtons();
  // Set the onclick event for each button to clear the selected prompt template
  buttons.forEach((button) => {
    button.onclick = () => {
      selectPromptTemplate(null);
    };
  });
}

// This function adds an "Export Button" to the sidebar
export function addExportButton() {
  // Get the nav element in the sidebar
  const nav = document.querySelector("nav");
  // If there is no nav element or the "Export Button" already exists, skip
  if (!nav || nav.querySelector("#export-button")) {
    return;
  }

  // Create the "Export Button" element
  const button = document.createElement("a");
  button.id = "export-button";
  button.className = css`ExportButton`;
  button.innerHTML = `${svg`Archive`} Export Chat`;
  button.onclick = exportCurrentChat;

  // If there is no chat started, disable the button
  if (document.querySelector(".flex-1.overflow-hidden h1")) {
    (button as any).style = "pointer-events: none;opacity: 0.5";
  }

  // Get the "Dark Mode" and "Light Mode" button as a reference point
  const colorModeButton = [...nav.children].find((child: any) =>
    child.innerText.toLowerCase().includes("mode")
  );
  // Insert the "Export Button" before the "Color Mode" button
  if (colorModeButton) { // check if colorModeButton exists
    nav.insertBefore(button, colorModeButton);
  }
}

// This function gets the "New Chat" buttons
export function getNewChatButtons(): HTMLButtonElement[] {
  // Get the sidebar and topbar elements
  const sidebar = document.querySelector("nav");
  const topbar = document.querySelector(".sticky");
  // Get the "New Chat" button in the sidebar
  const newChatButton = [
    ...(sidebar?.querySelectorAll(".cursor-pointer") ?? []),
  ].find((e: any) => e.innerText === "New Chat");
  const buttons: HTMLButtonElement[] = []
  if (newChatButton) {
    buttons.push(newChatButton as HTMLButtonElement);
  }
  // Get the "Plus" button in th e topbar
  const AddButton = topbar?.querySelector("button.px-3");
  if (AddButton) {
    buttons.push(AddButton as HTMLButtonElement);
  }
  // Return an array containing the buttons, filtering out any null elements
  return buttons.filter((button) => button);
}

export function addCopyButton(buttonGroup: any) {
  const button = document.createElement("button");
  button.onclick = () => {
    const text = buttonGroup.parentElement.innerText;
    navigator.clipboard.writeText(text);
  };
  button.className = css`action`;
  (button as any).innerHTML = svg`Clipboard`;
  buttonGroup.prepend(button);
}
