import { initSidebar } from './sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
    fetch('/FrontEnd/pages/sidebar.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            // Remove a sidebar antiga, se existir
            const oldSidebar = document.querySelector('.sidebar');
            if (oldSidebar) oldSidebar.remove();
            const oldBackdrop = document.querySelector('.sidebar-backdrop');
            if (oldBackdrop) oldBackdrop.remove();
            // Adiciona a nova sidebar e backdrop no início do body
            document.body.prepend(tempDiv.querySelector('.sidebar-backdrop'));
            document.body.prepend(tempDiv.querySelector('.sidebar'));
            // Agora inicializa os eventos da sidebar
            initSidebar();
            updateContent(); // Chame isso logo após inserir a sidebar
        });
});


