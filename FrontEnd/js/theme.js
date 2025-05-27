// Aplica o tema salvo ANTES de tudo
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = savedTheme || (prefersDark ? 'dark' : 'light');
const body = document.getElementById("body");

if (theme === 'dark') {
    body.classList.add('dark-mode', 'bg-dark', 'text-light');
    body.classList.remove('bg-light', 'text-dark');
} else {
    body.classList.remove('dark-mode', 'bg-dark', 'text-light');
    body.classList.add('bg-light', 'text-dark');
}

const toggleBtn = document.getElementById("toggleTheme");
const themeIcon = document.getElementById("theme-icon");

function setDarkMode() {
    body.classList.add("dark-mode", "bg-dark", "text-light");
    body.classList.remove("bg-light", "text-dark");
    toggleBtn.classList.add("btn-light");
    toggleBtn.classList.remove("btn-outline-primary");

    themeIcon.classList.remove("bi-moon-fill");
    themeIcon.classList.add("bi-sun-fill");

    localStorage.setItem("theme", "dark");
}

function setLightMode() {
    body.classList.remove("dark-mode", "bg-dark", "text-light");
    body.classList.add("bg-light", "text-dark");
    toggleBtn.classList.remove("btn-light");
    toggleBtn.classList.add("btn-outline-primary");

    themeIcon.classList.remove("bi-sun-fill");
    themeIcon.classList.add("bi-moon-fill");

    localStorage.setItem("theme", "light");
}

toggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
        setLightMode();
    } else {
        setDarkMode();
    }
});

window.addEventListener("DOMContentLoaded", () => {
    // Detecta o tema salvo ou o preferido pelo sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    // Aplica o tema imediatamente
    if (theme === 'dark') {
        document.body.classList.add('dark-mode', 'bg-dark', 'text-light');
    } else {
        document.body.classList.add('bg-light', 'text-dark');
    }

    // Exibe a tela após aplicar o tema
    document.body.style.visibility = 'visible'; // Torna o conteúdo visível

    // Sincroniza o select com o tema salvo
    const themeSelect = document.getElementById('theme');
    if (themeSelect) {
        // Define o valor do select conforme o tema salvo
        themeSelect.value = theme;

        // Altera o tema ao trocar o select
        themeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'dark') {
                setDarkMode();
            } else {
                setLightMode();
            }
        });
    }
});