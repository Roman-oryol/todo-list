import ListOption from './list-option';
import { getLists } from './task-list-manager';

const defaultList = getLists()[0];
const options = [];

function initDefaultOption() {
  addOption(defaultList);
}

function addOption(list) {
  const newOption = new ListOption(list);
  options.push(newOption);
}

function removeOption(list) {
  const index = options.findIndex((option) => option.id === list.id);
  if (index !== -1) {
    options.splice(index, 1);
  }
}

function getOptions() {
  return [...options];
}

initDefaultOption();

export { addOption, getOptions, initDefaultOption, removeOption };
