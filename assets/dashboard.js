const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');

menuButton.addEventListener('click', () => {
  sidebar.classList.toggle('show-sidebar');
});

