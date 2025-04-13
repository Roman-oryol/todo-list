import ListOption from './list-option';
import { loadData } from './storage';
import { getLists } from './task-list-manager';

const defaultList = getLists()[0];
const options = [];
const data = loadData();

function initDefaultOption() {
  if (data) {
    data.forEach((list) => {
      options.push(list);
    });
  } else {
    addOption(defaultList);
  }
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
