function createTaskCard(task) {
  const { title, description, dueDate, priority, status, isSelected } = task;
  const card = document.createElement('div');
  const truncatedDescription =
    description.length > 80 ? description.substr(0, 80) + '...' : description;

  card.classList.add('task-card', `${priority}`);

  if (isSelected) {
    card.classList.add('selected');
  }

  card.innerHTML = `
    <h2 class="task-title">${title}</h2>
    <p class="task-desc">
      ${truncatedDescription}
    </p>
    <footer class="task-footer">
      <span class="task-priority"
        >Приоритет:
        <span class="${priority}">${priority}</span></span
      >
      <span class="task-status"
        >Статус:
        <span class="${status}">${status.split('-').join(' ')}</span></span
      >
      <span class="task-due-date"
        >Срок: <span class="due-date">${dueDate}</span></span
      >
    </footer>`;

  return card;
}

export { createTaskCard };
