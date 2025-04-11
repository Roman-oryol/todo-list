import { statusLabels, priorityLabels } from './task-card';

/**
 * Generates the markup for displaying the details of a task.
 *
 * @param {Object} task - The task object containing details to be displayed.
 * @returns {string} The HTML markup string for the task details.
 */

export function createTaskDetailsMarkup(task) {
  const { title, description, dueDate, priority, status } = task;
  return `
    <header class="task-header">
            <h2 class="task-title">${title}</h2>
            <p class="task-priority">
              Приоритет: <span class="${priority}">${priorityLabels[priority]}</span>
            </p>
            <p class="task-status">
              Статус: <span class="${status}">${statusLabels[status]}</span>
            </p>
            <p class="task-due-date">
              Срок: <span class="due-date">${dueDate}</span>
            </p>
          </header>
          <div class="task-info">
            <p class="task-text">${description}</p>
          </div>
  `;
}
