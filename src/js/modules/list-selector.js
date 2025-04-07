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

function getOptions() {
  return [...options];
}

initDefaultOption();

export { addOption, getOptions, initDefaultOption };
