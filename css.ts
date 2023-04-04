export function css(name: TemplateStringsArray | string): string {
  name = Array.isArray(name) ? name[0] : name;
  switch (name) {
    case 'ExportButton': return 'flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm';
    case 'column': return 'flex flex-col gap-3.5 flex-1';
    case 'h2': return 'text-lg font-normal">Prompt Templates</h2><ul class="flex flex-col gap-3.5';
    case 'h3': return 'm-0 tracking-tight leading-8 text-gray-900 dark:text-gray-100 text-xl';
    case 'ul': return 'flex flex-col gap-3.5';
    case 'card': return 'flex flex-col gap-2 w-full bg-gray-50 dark:bg-white/5 p-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 text-left';
    case 'p': return 'm-0 font-light text-gray-500';
    case 'paginationText': return 'text-sm text-gray-700 dark:text-gray-400';
    case 'paginationNumber': return 'font-semibold text-gray-900 dark:text-white';
    case 'paginationButtonGroup': return 'inline-flex mt-2 xs:mt-0';
    case 'paginationButton': return 'px-4 py-2  font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white';
    case 'action': return 'p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible';
    case 'tag': return 'inline-flex items-center py-1 px-2 mr-2 mb-2 text-sm font-medium text-white rounded bg-gray-600 whitespace-nowrap';
    default: return '';
  }
}
