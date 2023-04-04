import { selectPromptTemplate } from "./template_functions";

export function setupFetch() {
  const w: any = window
  const fetch = w._fetch = w._fetch || window.fetch;
  // Replace the fetch function with a modified version that will include a prompt template
  // if one has been selected by the user
  window.fetch = (...t) => {
    // If the request is not for the chat backend API, just use the original fetch function
    if (t[0] !== 'https://chat.openai.com/backend-api/conversation')
      return fetch(...t);
    // If no prompt template has been selected, use the original fetch function
    if (!w.selectedprompttemplate)
      return fetch(...t);
    // Get the selected prompt template
    const template = w.selectedprompttemplate;

    try {
      // Get the options object for the request, which includes the request body
      const options: any = t[1];
      // Parse the request body from JSON
      const body = JSON.parse(options.body);
      // Get the prompt from the request body
      const prompt = body.messages[0].content.parts[0];
      // Replace the prompt in the request body with the selected prompt template,
      // inserting the original prompt into the template
      body.messages[0].content.parts[0] = template.prompt.replace('[INSERT]', prompt);
      // Clear the selected prompt template
      selectPromptTemplate(null);
      // Stringify the modified request body and update the options object
      options.body = JSON.stringify(body);
      // Use the modified fetch function to make the request
      return fetch(t[0], options);
    } catch {
      // If there was an error parsing the request body or modifying the request,
      // just use the original fetch function
      return fetch(...t);
    }
  };
  return fetch;
}
