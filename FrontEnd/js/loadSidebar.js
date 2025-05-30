import { initSidebar } from './sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
    fetch('/FrontEnd/pages/sidebar.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const oldSidebar = document.querySelector('.sidebar');
            if (oldSidebar) oldSidebar.remove();
            const oldBackdrop = document.querySelector('.sidebar-backdrop');
            if (oldBackdrop) oldBackdrop.remove();

            document.body.prepend(tempDiv.querySelector('.sidebar-backdrop'));
            document.body.prepend(tempDiv.querySelector('.sidebar'));

            // Inicializa eventos da sidebar
            initSidebar();

            // Esconde o menu de relatório se não for analista
            const usuario = JSON.parse(localStorage.getItem('Usuario') || '{}');
            const tipo = usuario.tipoUsuario;

            if (tipo === 'usuario') {
                const relatorioMenu = document.getElementById('menu-relatorio');
                if (relatorioMenu) {
                    relatorioMenu.style.display = 'none';
                }
            }

            if (tipo === 'analista') {
                const relatorioMenu = document.getElementById('menu-new-ticket');
                if (relatorioMenu) {
                    relatorioMenu.style.display = 'none';
                }
            }
        });
});
