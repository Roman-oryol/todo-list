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
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
  }
}

export default TaskManager;
