function createListSwitcher({ name, id, isActive }) {
  const listSwitcherContainer = document.createElement('div');
  const listSelectButton = document.createElement('button');
  const listActionsButton = document.createElement('button');

  listSwitcherContainer.classList.add('list-switcher-container');
  listSwitcherContainer.setAttribute('data-id', id);

  listSelectButton.setAttribute('type', 'button');
  listSelectButton.classList.add('list-select-button');

  if (isActive) {
    listSelectButton.classList.add('list-select-button--active');
  }

  listSelectButton.disabled = isActive;
  listSelectButton.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        d="M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M16.53,11.06L15.47,10L10.59,14.88L8.47,12.76L7.41,13.82L10.59,17L16.53,11.06Z"
      />
    </svg>${name}`;

  listActionsButton.setAttribute('type', 'button');
  listActionsButton.classList.add('list-actions-button');

  listActionsButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
    </svg>
  `;

  listSwitcherContainer.append(listSelectButton, listActionsButton);

  return listSwitcherContainer;
}

function renderListActions(list) {
  const dialog = document.createElement('dialog');
  const button = document.createElement('button');

  dialog.classList.add('list-actions-modal');
  button.classList.add('list-action-btn');
  button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
    </svg>
  Удалить список`;
  dialog.appendChild(button);

  list.appendChild(dialog);
}

export { createListSwitcher, renderListActions };
