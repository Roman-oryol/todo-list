import List from './list';

const lists = [];

function initDefaultList() {
  const defaultList = new List('Moи задачи');
  lists.push(defaultList);
  defaultList.toggleActive(true);
}

function deactivateAllLists() {
  lists.forEach((list) => {
    list.toggleActive(false);
  });
}

function addList(list) {
  deactivateAllLists();
  lists.push(list);
}

function setActiveList(list) {
  const newActiveList = lists.find((obj) => list.id === obj.id);

  deactivateAllLists();
  newActiveList.toggleActive(true);
}

function getLists() {
  return [...lists];
}

function getActiveList() {
  return getLists().find((list) => list.isActive === true);
}

initDefaultList();

export { addList, getLists, initDefaultList, setActiveList, getActiveList };
