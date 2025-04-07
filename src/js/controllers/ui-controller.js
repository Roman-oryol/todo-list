import { createTaskCard } from '../components/task-card';
import { openListModal } from '../controllers/list-modal-controller';
import { openTaskModal } from '../controllers/task-modal-controller';
import { getLists, setActiveList } from '../modules/task-list-manager';
import { createTaskListTab } from '../components/task-list-tab';
import { createTaskDetailsMarkup } from '../components/task-details';
import { getActiveList } from '../modules/task-list-manager';

let addTaskBtn;
let editTaskBtn;
let addListBtn;
let deleteTaskBtn;
let taskList;
let taskListTabs;
let taskDetails;

function cashDOM() {
  addTaskBtn = document.getElementById('add-task');
  editTaskBtn = document.getElementById('edit-task');
  taskList = document.getElementById('task-list');
  addListBtn = document.getElementById('add-list');
  taskListTabs = document.getElementById('task-list-tabs');
  taskDetails = document.getElementById('task-details-content');
  deleteTaskBtn = document.getElementById('delete-task');
}

function bindEvents() {
  addTaskBtn.addEventListener('click', handleAddTaskClick);
  editTaskBtn.addEventListener('click', handleEditTaskClick);
  addListBtn.addEventListener('click', handleAddList);
  deleteTaskBtn.addEventListener('click', handleDeleteTask);
}

function handleAddTaskClick() {
  openTaskModal();
}

function handleEditTaskClick() {
  const isEdit = true;
  openTaskModal(isEdit);
}

function handleAddList() {
  openListModal();
}

function handleDeleteTask() {
  const activeList = getActiveList();
  const taskForDelete = activeList.getActiveTask();

  activeList.deleteTask(taskForDelete);

  renderTasks(activeList.taskList);
  renderTaskDetails(activeList.getActiveTask());
}

function updateTaskButtonsState() {
  const isEmpty = getActiveList().isEmpty;
  deleteTaskBtn.disabled = isEmpty;
  editTaskBtn.disabled = isEmpty;
}

function renderTasks(tasks) {
  updateTaskButtonsState();

  if (tasks.isEmpty) {
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

  taskListTabs.innerHTML = '';
  clearTaskView();

  lists.forEach((list) => {
    const newTab = createTaskListTab(list);
    newTab.addEventListener('click', () => handleSwitchlist(list));
    taskListTabs.appendChild(newTab);
  });
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
  console.log(getActiveList().taskList);
}

export { uiInit, renderTasks, renderLists, renderTaskDetails };
