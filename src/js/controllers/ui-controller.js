import { createTaskCard } from '../components/task-card';
import { openListModal } from '../controllers/list-modal-controller';
import { openTaskModal } from '../controllers/task-modal-controller';
import {
  getLists,
  setActiveList,
  deleteList,
} from '../modules/task-list-manager';
import {
  createListSwitcher,
  renderListActions,
} from '../components/list-switcher';
import { createTaskDetailsMarkup } from '../components/task-details';
import { getActiveList } from '../modules/task-list-manager';
import { removeOption } from '../modules/list-selector';

let addTaskBtn;
let editTaskBtn;
let addListBtn;
let deleteTaskBtn;
let taskList;
let taskListTabs;
let taskDetails;
let mainHeader;

function cashDOM() {
  addTaskBtn = document.getElementById('add-task');
  editTaskBtn = document.getElementById('edit-task');
  taskList = document.getElementById('task-list');
  addListBtn = document.getElementById('add-list');
  taskListTabs = document.getElementById('task-list-tabs');
  taskDetails = document.getElementById('task-details-content');
  deleteTaskBtn = document.getElementById('delete-task');
  mainHeader = document.getElementById('main-header');
}

function bindEvents() {
  addTaskBtn.addEventListener('click', handleAddTaskClick);
  editTaskBtn.addEventListener('click', handleEditTaskClick);
  addListBtn.addEventListener('click', handleAddList);
  deleteTaskBtn.addEventListener('click', handleDeleteTask);
}

function handleAddTaskClick(e) {
  openTaskModal(e);
}

function handleEditTaskClick(e) {
  openTaskModal(e);
}

function handleAddList() {
  openListModal();
}

function showConfirmDeleteDialog(onConfirm, isTask = true) {
  const confirmDeleteDialog = document.getElementById('confirm-delete-dialog');
  const dialogText = confirmDeleteDialog.querySelector('p');
  dialogText.textContent = isTask
    ? 'Вы уверены, что хотите удалить эту задачу?'
    : 'Вы уверены, что хотите удалить этот список задач?';

  confirmDeleteDialog.showModal();

  const confirmButton = confirmDeleteDialog.querySelector('.confirm-button');
  const cancelButton = confirmDeleteDialog.querySelector('.cancel-button');

  const cleanup = () => {
    confirmButton.removeEventListener('click', handleConfirm);
    cancelButton.removeEventListener('click', handleCancel);
  };

  const handleConfirm = () => {
    onConfirm();
    confirmDeleteDialog.close();
    cleanup();
  };

  const handleCancel = () => {
    confirmDeleteDialog.close();
    cleanup();
  };

  confirmButton.addEventListener('click', handleConfirm);
  cancelButton.addEventListener('click', handleCancel);
}

function handleDeleteTask() {
  const activeList = getActiveList();
  const taskForDelete = activeList.getActiveTask();

  const onConfirm = () => {
    activeList.deleteTask(taskForDelete);
    renderTasks(activeList.taskList);
    renderTaskDetails(activeList.getActiveTask());
  };

  showConfirmDeleteDialog(onConfirm);
}

function updateTaskButtonsState() {
  const isEmpty = getActiveList()?.isEmpty || getLists().length === 0;
  deleteTaskBtn.disabled = isEmpty;
  editTaskBtn.disabled = isEmpty;
}

function renderTasks(tasks = []) {
  updateTaskButtonsState();

  if (tasks?.isEmpty) {
    return;
  }

  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const newTask = createTaskCard(task);

    newTask.addEventListener('click', () => handleSwitchTask(task));

    taskList.appendChild(newTask);
  });
}

function renderLists() {
  const lists = getLists();

  updateTaskButtonsState();
  updateEmptyTaskListsState(lists.length === 0);

  taskListTabs.innerHTML = '';
  clearTaskView();

  lists.forEach((list) => {
    const newSwitcher = createListSwitcher(list);
    const actionsButton = newSwitcher.querySelector('.list-actions-button');

    actionsButton.addEventListener('click', (e) =>
      handleActionsClick(e, newSwitcher)
    );
    newSwitcher.addEventListener('click', () => handleSwitchlist(list));
    taskListTabs.appendChild(newSwitcher);
  });
}

function updateEmptyTaskListsState(isEmptyTaskLists) {
  const messageEl = mainHeader.querySelector('.message');

  addTaskBtn.disabled = isEmptyTaskLists;
  messageEl.textContent = isEmptyTaskLists
    ? 'Для добавления задач создайте список задач!'
    : '';
}

function handleDeleteTaskList(list) {
  const onConfirm = () => {
    let activeList;
    let updatedLists;
    const lists = getLists();
    const listForDelete = lists.find((l) => l.id === list.dataset.id);

    removeOption(listForDelete);
    deleteList(listForDelete);

    updatedLists = getLists();

    setActiveList(updatedLists.length > 0 ? updatedLists[0] : null);

    activeList = getActiveList();
    activeList?.setTaskSelected(activeList?.taskList[0]);

    renderLists();
    renderTasks(activeList?.taskList);
    renderTaskDetails(activeList?.taskList[0]);
  };

  showConfirmDeleteDialog(onConfirm, false);
}

function handleActionsClick(e, list) {
  e.stopPropagation();
  renderListActions(list);

  const dialog = list.querySelector('.list-actions-modal');
  const deleteBtn = dialog.querySelector('.list-action-btn');

  deleteBtn.addEventListener('click', () => handleDeleteTaskList(list));

  dialog.show();

  dialog.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  const handleOutsideClick = (event) => {
    if (!dialog.contains(event.target)) {
      dialog.close();
      document.removeEventListener('click', handleOutsideClick);
    }
  };

  document.addEventListener('click', handleOutsideClick);
}

function renderTaskDetails(task = null) {
  taskDetails.innerHTML = '';

  if (task == null) {
    return;
  }
  taskDetails.innerHTML = createTaskDetailsMarkup(task);
}

function clearTaskView() {
  taskList.innerHTML = '';
  taskDetails.innerHTML = '';
}

function handleSwitchlist(list) {
  renderTaskDetails();

  setActiveList(list);
  renderLists();

  if (list.taskList.length > 0) {
    list.setTaskSelected(list.taskList[0]);
    renderTasks(list.taskList);
    renderTaskDetails(list.taskList[0]);
  }
}

function handleSwitchTask(task) {
  const activeList = getActiveList();

  if (activeList) {
    activeList.setTaskSelected(task);
    renderTasks(activeList.taskList);
  }
  renderTaskDetails(task);
}

function uiInit() {
  cashDOM();
  bindEvents();
  renderLists();
  renderTasks(getActiveList().taskList);
}

export { uiInit, renderTasks, renderLists, renderTaskDetails };
