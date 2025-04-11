import { renderTaskDetails, renderTasks } from './ui-controller';
import Task from '../modules/task';
import { getOptions } from '../modules/list-selector';
import { createSelectOption } from '../components/select-option';
import {
  getActiveList,
  getLists,
  moveTaskToList,
} from '../modules/task-list-manager';

const modal = document.getElementById('task-dialog');
const form = modal.querySelector('form');
const closeModalBtn = modal.querySelector('.close-modal');
const listSelect = modal.querySelector('#task-project');

let isEditModal = false;

function resetForm() {
  form.reset();
}

function openTaskModal(e) {
  const modalTitle = modal.querySelector('h2');
  const taskTitle = modal.querySelector('[name="title"]');
  const taskDueDate = modal.querySelector('[name="date"]');
  const taskPriorityInputs = modal.querySelectorAll('[name="priority"]');
  const taskDescription = modal.querySelector('[name="description"]');

  resetForm();

  isEditModal = e.currentTarget.dataset.action === 'edit';

  if (isEditModal) {
    const selectedTask = getActiveList().getActiveTask();
    const { title, dueDate, priority, description } = selectedTask;
    taskTitle.value = title;
    taskDueDate.value = dueDate;
    taskPriorityInputs.forEach((input) => {
      input.checked = input.value === priority;
    });
    taskDescription.value = description;
  }

  modalTitle.textContent = isEditModal
    ? 'Редактировать задачу'
    : 'Добавить новую задачу';

  renderSelectOptions();
  modal.showModal();
}

closeModalBtn.addEventListener('click', () => modal.close());

function addTaskToList(taskData, newTask) {
  const lists = getLists();
  const targetList = lists.find((list) => list.name === taskData.listName);

  if (!targetList) {
    throw new Error(`Список с именем "${taskData.listName}" не найден.`);
  }

  targetList.addTask(newTask);
}

function editTask(taskData) {
  const selectedTask = getActiveList().getActiveTask();
  selectedTask.editTask(taskData);
}

function updateTasksIfActiveList(taskData) {
  const activeList = getActiveList();

  if (activeList && activeList.name === taskData.listName) {
    renderTasks(activeList.taskList);
    renderTaskDetails(activeList.taskList[0]);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const activeList = getActiveList();
  const taskData = Object.fromEntries(new FormData(form));

  if (isEditModal) {
    editTask(taskData);

    if (taskData.listName !== activeList.name) {
      moveTaskToList(taskData.listName);
    }

    renderTasks(activeList.taskList);
    renderTaskDetails(activeList.getActiveTask());
  } else {
    const newTask = new Task(taskData);
    addTaskToList(taskData, newTask);
    updateTasksIfActiveList(taskData);
  }

  modal.close();
}

function renderSelectOptions() {
  const options = getOptions();
  const activeList = getActiveList();

  listSelect.innerHTML = '';

  if (activeList) {
    options.forEach((option) => {
      const newOptionEl = createSelectOption(option);

      if (activeList.name === option.name) {
        newOptionEl.selected = true;
      }

      listSelect.appendChild(newOptionEl);
    });
  }
}

form.addEventListener('submit', handleSubmit);

export { openTaskModal, renderSelectOptions };
