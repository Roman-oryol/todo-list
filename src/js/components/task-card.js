import { openChangeStatusModal } from '../controllers/change-status-controller';

const statusLabels = {
  'in-progress': 'В процессе',
  'not-started': 'Не начата',
  completed: 'Завершена',
};

const priorityLabels = {
  extreme: 'Критический',
  moderate: 'Средний',
  low: 'Низкий',
};

function handleChangeStatus(e, task) {
  e.stopPropagation();
  openChangeStatusModal(task);
}

function createTaskCard(task) {
  const { title, description, dueDate, priority, status, isSelected, id } =
    task;
  const card = document.createElement('div');
  const truncatedDescription =
    description.length > 80 ? description.substr(0, 80) + '...' : description;

  card.classList.add('task-card', `${priority}`);
  card.setAttribute('data-id', id);

  if (isSelected) {
    card.classList.add('selected');
  }

  card.innerHTML = `
    <div class="task-header">
      <h2 class="task-title">${title}</h2>
      <button type="button" class="task-change-status">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
        </svg>Cтатус
      </button>
    </div>
    <p class="task-desc">
      ${truncatedDescription}
    </p>
    <footer class="task-footer">
      <span class="task-priority"
        >Приоритет:
        <span class="${priority}">${priorityLabels[priority]}</span></span
      >
      <span class="task-status"
        >Статус:
        <span class="${status}">${statusLabels[status]}</span></span
      >
      <span class="task-due-date"
        >Срок: <span class="due-date">${dueDate}</span></span
      >
    </footer>`;

  const changeStatusButton = card.querySelector('.task-change-status');
  changeStatusButton.addEventListener('click', (e) =>
    handleChangeStatus(e, task)
  );

  return card;
}

export { createTaskCard, statusLabels, priorityLabels };
