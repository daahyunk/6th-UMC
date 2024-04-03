const modal = document.getElementById('myModal');
const btnOpen = document.getElementById('openModal');
const btnClose = document.getElementById('closeModal');

btnOpen.onclick = function () {
  modal.style.display = 'flex';
};

btnClose.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
