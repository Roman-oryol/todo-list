import { getLists } from './task-list-manager';
import List from './list';
import Task from './task';
import TaskManager from './task-manager';

function saveData(value) {
  localStorage.setItem('lists', JSON.stringify(value));
}

function loadData() {
  const data = localStorage.getItem('lists');
  const dataArray = data ? JSON.parse(data) : null;

  if (dataArray) {
    dataArray.forEach((list) => {
      Object.setPrototypeOf(list, List.prototype);
      Object.setPrototypeOf(list.taskManager, TaskManager.prototype);
      list.taskList.forEach((task) => {
        Object.setPrototypeOf(task, Task.prototype);
      });
    });
  }

  return dataArray;
}

export { saveData, loadData };
