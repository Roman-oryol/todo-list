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
  if (list) {
    const newActiveList = lists.find((obj) => list.id === obj.id);

    deactivateAllLists();
    newActiveList.toggleActive(true);
  }
}

function getLists() {
  return [...lists];
}

function getActiveList() {
  return getLists().find((list) => list.isActive === true);
}

function moveTaskToList(newListName) {
  const activeList = getActiveList();
  const taskForMove = activeList.extractTaskForTransfer();

  activeList.setTaskSelected(activeList.taskList[0]);

  lists.find((list) => list.name === newListName).addTask(taskForMove);
}

function deleteList(list) {
  if (list) {
    const index = lists.findIndex((l) => l.id === list.id);
    lists.splice(index, 1);
  }
}

initDefaultList();

export {
  addList,
  getLists,
  initDefaultList,
  setActiveList,
  getActiveList,
  moveTaskToList,
  deleteList,
};
