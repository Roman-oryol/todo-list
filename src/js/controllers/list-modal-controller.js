import List from '../modules/list';
import { addOption } from '../modules/list-selector';
import { addList } from '../modules/task-list-manager';
import { renderLists } from './ui-controller';

const modal = document.getElementById('add-list-modal');
const form = modal.querySelector('.add-list-form');
const closeBtn = modal.querySelector('.close-modal');

function openListModal() {
  clearInput();
  modal.showModal();
}

function clearInput() {
  form.querySelector('.list-title').value = '';
}

function handleSubmit(e) {
  e.preventDefault();

  const listNameInput = form.querySelector('.list-title');
  const listName = listNameInput.value.trim();
  const newList = new List(listName);

  addList(newList);
  addOption(newList);
  renderLists();
  modal.close();
}

form.addEventListener('submit', handleSubmit);
closeBtn.addEventListener('click', () => modal.close());

export { openListModal };
