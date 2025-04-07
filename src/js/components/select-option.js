export function createSelectOption(option) {
  const optionEl = document.createElement('option');

  optionEl.textContent = option.name;

  return optionEl;
}
