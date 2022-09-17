const getFocusableElements = (element: HTMLElement): Array<HTMLElement> => Array
  .from(element.querySelectorAll(
    'a, button, input, textarea, select, details, [contenteditable], [tabindex]:not([tabindex="-1"])',
  ))
  .filter((el) => !el.hasAttribute('disabled')) as Array<HTMLElement>;

export default getFocusableElements;
