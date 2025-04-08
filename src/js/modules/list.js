import { v4 as uuidv4 } from 'uuid';
import TaskManager from './task-manager';

export default class List {
  isActive = true;
  isEmpty = true;
  #taskManager = new TaskManager();

  constructor(name) {
    this.id = uuidv4();
    this.name = name;
  }

  toggleActive(isActive) {
    this.isActive = isActive;
  }

  addTask(task) {
    this.#taskManager.addTask(task);
    this.isEmpty = false;
  }

  get taskList() {
    return this.#taskManager.getTasks();
  }

  setTaskSelected(task) {
    this.#taskManager.setTaskSelected(task);
  }

  deleteTask(task) {
    if (this.isEmpty) {
      return;
    }

    this.#taskManager.deleteTask(task);

    if (this.isTaskListEmpty()) {
      this.isEmpty = true;
    } else {
      this.setTaskSelected(this.taskList[0]);
    }
  }

  isTaskListEmpty() {
    return this.taskList.length === 0;
  }

  getActiveTask() {
    return this.taskList.find((task) => task.isSelected);
  }

  extractTaskForTransfer() {
    const activeTask = this.getActiveTask();
    return this.#taskManager.extractTaskForTransfer(activeTask);
  }
}
