class TaskManager {
  constructor() {
    this.tasks = [];
  }

  selectTask(task) {
    this.tasks.forEach((task) => (task.isSelected = false));
    task.isSelected = true;
  }

  addTask(task) {
    this.selectTask(task);
    this.tasks.unshift(task);
  }

  getTasks() {
    return [...this.tasks];
  }

  setTaskSelected(task) {
    this.tasks.forEach((t) => (t.isSelected = t === task));
  }

  deleteTask(task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks.splice(index, 1);
  }

  extractTaskForTransfer(task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);

    return this.tasks.splice(index, 1)[0];
  }
}

export default TaskManager;
