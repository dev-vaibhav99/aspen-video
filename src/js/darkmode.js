let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.getElementById("dark-mode-toggle");
const toggle = document.getElementById("toggle-icon");

const enableDarkMode = () => {
    toggle.classList.remove("fa-sharp","fa-solid", "fa-moon");
    toggle.classList.add("fa-sharp", "fa-solid", "fa-sun");
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', true);
}

const disableDarkMode = () => {
    toggle.classList.remove("fa-sharp", "fa-solid", "fa-sun");
    toggle.classList.add("fa-sharp","fa-solid", "fa-moon");
    document.body.classList.remove('darkmode');
    localStorage.removeItem('darkMode');
}

darkMode && enableDarkMode();

darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');
    darkMode === 'true'? disableDarkMode() : enableDarkMode();
});