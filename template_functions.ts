import { css } from "./css";
import { svg } from "./svg";

// This object contains properties for the prompt templates section
const promptTemplateSection = {
  currentPage: 0,
  pageSize: 5 // The number of prompt templates per page
};

export function setupTemplates(fetch: any) {
  fetch('https://raw.githubusercontent.com/mohalobaidi/awesome-chatgpt-prompts/main/prompts.csv')
    // Convert the response to text
    .then((res: any) => res.text())
    // Convert the CSV text to an array of records
        .then((csv: any) => CSVToArray(csv))
    // Map the records to template objects with properties 'title', 'prompt', and 'placeholder'
    .then((records: any) => {
            return records.map(([title, prompt, placeholder]) => {
        return { title, prompt, placeholder };
      })
        // Filter out records that do not have a title or it is the header row (with "title" as its title)
        .filter(({
          title
        }: any) => title && title !== 'title');
    })
    .then((templates: any) => {
      // Save the array of prompt templates to a global variable
            window.prompttemplates = templates;
      // Insert the "Prompt Templates" section into the chat interfac
      insertPromptTemplatesSection();
    });
}
// This function inserts a section containing a list of prompt templates into the chat interface
export function insertPromptTemplatesSection() {
  // Get the title element (as a reference point and also for some alteration)
  const title = document.querySelector('h1.text-4xl');
  // If there is no title element, return
  if (!title)
    return;

  // Style the title element and set it to "Enhanced ChatGPT"
    title.style = 'text-align: center; margin-top: 4rem';
  title.innerHTML = 'Enhanced ChatGPT';

  // Get the list of prompt templates
    const templates = window.prompttemplates;
  // If there are no templates, skip
  if (!templates)
    return;

  // Get the parent element of the title element (main page)
  const parent = title.parentElement;
  // If there is no parent element, skip
  if (!parent)
    return;

  // Remove the "md:h-full" class from the parent element
  parent.classList.remove('md:h-full');

  // Get the current page number and page size from the promptTemplateSection object
  const { currentPage, pageSize } = promptTemplateSection;
  // Calculate the start and end indices of the current page of prompt templates
  const start = pageSize * currentPage;
  const end = Math.min(pageSize * (currentPage + 1), templates.length);
  // Get the current page of prompt templates
    const currentTemplates = window.prompttemplates.slice(start, end);

  // Create the HTML for the prompt templates section
  const html = `
    <div class="${css`column`}">
    ${svg`ChatBubble`}
    <h2 class="${css`h2`}">
    <ul class="${css`ul`}">
      ${currentTemplates.map((template: any, i: any) => `
        <button onclick="selectPromptTemplate(${start + i})" class="${css`card`}">
          <h3 class="${css`h3`}">${template.title}</h3>
          <p class="${css`p`}">${template.prompt.replace('[INSERT]', template.placeholder)}</p>
          <span class="font-medium">Use prompt →</span>
        </button>
      `).join('')}
    </ul>

    <div class="${css`column`} items-center">
      <span class="${css`paginationText`}">
        Showing <span class="${css`paginationNumber`}">${start + 1}</span> to <span class="${css`paginationNumber`}">${end}</span> of <a href="https://prompts.chat/" target="_blank" class="underline"><span class="${css`paginationNumber`}">${templates.length} Entries</span></a>
      </span>
      <div class="${css`paginationButtonGroup`}">
        <button onclick="prevPromptTemplatesPage()" class="${css`paginationButton`}" style="border-radius: 6px 0 0 6px">Prev</button>
        <button onclick="nextPromptTemplatesPage()" class="${css`paginationButton`} border-0 border-l border-gray-500" style="border-radius: 0 6px 6px 0">Next</button>
      </div>
    </div>
    </div>
  `;

  let wrapper = document.createElement('div');
  wrapper.id = 'templates-wrapper';
  wrapper.className = 'mt-6 flex items-start text-center gap-3.5';

  if (parent.querySelector('#templates-wrapper')) {
        wrapper = parent.querySelector('#templates-wrapper');
  } else {
    parent.appendChild(wrapper);
  }

  wrapper.innerHTML = html;
}
export function prevPromptTemplatesPage() {
  promptTemplateSection.currentPage--;
  promptTemplateSection.currentPage = Math.max(0, promptTemplateSection.currentPage);
  // Update the section
  insertPromptTemplatesSection();
}
export function nextPromptTemplatesPage() {
    const templates = window.prompttemplates;
  if (!templates || !Array.isArray(templates))
    return;

  promptTemplateSection.currentPage++;
  promptTemplateSection.currentPage = Math.min(
    Math.floor(
      (templates.length - 1) /
      promptTemplateSection.pageSize
    ),
    promptTemplateSection.currentPage
  );
  // Update the section
  insertPromptTemplatesSection();
}
// This function selects a prompt template
export function selectPromptTemplate(idx: any) {
  // Get the list of prompt templates 
    const templates = window.prompttemplates;
  // If there are no templates, skip
  if (!templates || !Array.isArray(templates))
    return;

  const template = templates[idx];

  const textarea = document.querySelector('textarea');
    const parent = textarea.parentElement;
  let wrapper = document.createElement('div');
  wrapper.id = 'prompt-wrapper';
    if (parent.querySelector('#prompt-wrapper')) {
        wrapper = parent.querySelector('#prompt-wrapper');
  } else {
        parent.prepend(wrapper);
  }

  if (template) {
    wrapper.innerHTML = `
    <span class="${css`tag`}">
      ${template.title}
    </span>
    `;
        textarea.placeholder = template.placeholder;
        window.selectedprompttemplate = template;
        textarea.focus();
  } else {
    wrapper.innerHTML = ``;
        textarea.placeholder = '';
        window.selectedprompttemplate = null;
  }
}
