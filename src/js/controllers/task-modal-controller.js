import { renderTaskDetails, renderTasks } from './ui-controller';
import Task from '../modules/task';
import { getOptions } from '../modules/list-selector';
import { createSelectOption } from '../components/select-option';
import { getActiveList, getLists } from '../modules/task-list-manager';

const modal = document.getElementById('task-dialog');
const form = modal.querySelector('form');
const closeModalBtn = modal.querySelector('.close-modal');
const listSelect = modal.querySelector('#task-project');

const openTaskModal = (isEdit = false) => {
  const title = modal.querySelector('h2');
  title.textContent = isEdit ? 'Редактировать задачу' : 'Добавить новую задачу';
  renderSelectOptions();
  modal.showModal();
};

closeModalBtn.addEventListener('click', () => modal.close());

const addTaskToList = (taskData, newTask) => {
  const lists = getLists();
  const targetList = lists.find((list) => list.name === taskData.listName);

  if (!targetList) {
    throw new Error(`Список с именем "${taskData.listName}" не найден.`);
  }

  targetList.addTask(newTask);
};

function updateTasksIfActiveList(taskData) {
  const activeList = getActiveList();

  if (activeList && activeList.name === taskData.listName) {
    renderTasks(activeList.taskList);
    renderTaskDetails(activeList.taskList[0]);
  }
}

const handleSubmit = (e) => {
  e.preventDefault();

  const taskData = Object.fromEntries(new FormData(form));
  const newTask = new Task(taskData);

  addTaskToList(taskData, newTask);

  updateTasksIfActiveList(taskData);

  modal.close();
};

const renderSelectOptions = () => {
  const options = getOptions();
  const activeList = getActiveList();

  listSelect.innerHTML = '';

  options.forEach((option) => {
    const newOptionEl = createSelectOption(option);

    if (activeList.name === option.name) {
      newOptionEl.selected = true;
    }

    listSelect.appendChild(newOptionEl);
  });
};

form.addEventListener('submit', handleSubmit);

export { openTaskModal, renderSelectOptions };
