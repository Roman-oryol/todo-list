import { v4 as uuidv4 } from 'uuid';

class Task {
  isSelected = false;

  constructor({ title, description, date, priority, status = 'not-started' }) {
    this.title = title;
    this.description = description;
    this.dueDate = date;
    this.priority = priority;
    this.status = status;
    this.id = uuidv4();
  }

  toggleSelection(isSelected) {
    this.isSelected = isSelected;
  }

  editTask({ title, description, date, priority }) {
    this.title = title;
    this.description = description;
    this.dueDate = date;
    this.priority = priority;
  }
}

export default Task;
