import { setupSidebar } from "./button_functions"
import { setupFetch } from "./fetch_function"
import { setupObserver } from "./mutation_observer"
import { setupTemplates } from "./template_functions"

(function () {
  // Save a reference to the original fetch function
  const fetch = setupFetch()

  // Create a new observer for the chat sidebar to watch for changes to the document body
  setupObserver()

  // Fetch the list of prompt templates from a remote CSV file
  setupTemplates(fetch)

  // Set up the Sidebar (by adding "Export Chat" button and other stuff)
  setupSidebar()
})()



