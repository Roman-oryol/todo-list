import { saveData } from '../modules/storage';
import { getActiveList, getLists } from '../modules/task-list-manager';
import { renderTaskDetails, renderTasks } from './ui-controller';

const changeStatusModal = document.getElementById('change-status-dialog');
const modalContent = changeStatusModal.querySelector('.modal-content');
const changeStatusBtn =
  changeStatusModal.querySelectorAll('.change-status-btn');

function highlightCurrentStatus(task) {
  const currentStatusElement = changeStatusModal.querySelector(
    `[data-status="${task.status}"]`
  );
  if (currentStatusElement) {
    changeStatusBtn.forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove('highlight');
    });
    currentStatusElement.disabled = true;
    currentStatusElement.classList.add('highlight');
  }
}

function handleChangeStatus(task, newStatus) {
  const activeList = getActiveList();
  const taskForChange = activeList.taskList.find((t) => t.id === task.id);

  taskForChange.changeStatus(newStatus);
  renderTasks(getActiveList().taskList);

  if (taskForChange.isSelected) {
    renderTaskDetails(task);
  }

  changeStatusModal.close();
  saveData(getLists());
}

function openChangeStatusModal(task) {
  highlightCurrentStatus(task);

  const handleButtonClick = (event) =>
    handleChangeStatus(task, event.target.dataset.status);

  const handleOutsideClick = (event) => {
    if (!modalContent.contains(event.target)) {
      closeChangeStatusModal();
      document.removeEventListener('click', handleOutsideClick);
    }
  };

  changeStatusBtn.forEach((btn) => {
    btn.addEventListener('click', handleButtonClick);
  });

  changeStatusModal.addEventListener('close', function cleanup() {
    changeStatusBtn.forEach((btn) => {
      btn.removeEventListener('click', handleButtonClick);
    });
    changeStatusModal.removeEventListener('close', cleanup);
    document.removeEventListener('click', handleOutsideClick);
  });

  document.addEventListener('click', handleOutsideClick);
  changeStatusModal.showModal();
}

function closeChangeStatusModal() {
  changeStatusModal.close();
}

export {
  openChangeStatusModal,
  closeChangeStatusModal,
  highlightCurrentStatus,
};
