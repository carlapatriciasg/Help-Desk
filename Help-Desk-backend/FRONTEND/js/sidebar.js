export function initSidebar() {
    //<!-- fechar a sidebar -->
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarBackdrop = document.querySelector('#sidebarBackdrop');

    if (sidebarToggle && sidebar && sidebarBackdrop) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('show');
            sidebarBackdrop.classList.toggle('show');
        });

        sidebarBackdrop.addEventListener('click', function () {
            sidebar.classList.remove('show');
            sidebarBackdrop.classList.remove('show');
        });
    } else {
        console.error('Elementos necessários para a funcionalidade da sidebar não foram encontrados.');
    }

    // Recolher sidebar
    const sidebarCollapseButton = document.querySelector('.sidebar-collapse');
    const mainContentWrapper = document.querySelector('.main-content-wrapper');

    if (sidebarCollapseButton && sidebar && mainContentWrapper) {
        sidebarCollapseButton.addEventListener('click', function () {
            sidebar.classList.toggle('collapsed');
            mainContentWrapper.classList.toggle('collapsed');
        });
    } else {
        console.error('Elementos necessários para a funcionalidade de recolher a sidebar não foram encontrados.');
    }

    // Logout button na sidebar
    const logoutSidebarButton = document.getElementById('logout-button-sidebar');
    if (logoutSidebarButton) {
        logoutSidebarButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Tem certeza de que deseja sair?')) {
                window.location.href = 'index.html';
            }
        });
    }

    // Logout button no dropdown do cabeçalho
    const logoutHeaderButton = document.getElementById('logout-button');
    if (logoutHeaderButton) {
        logoutHeaderButton.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Tem certeza de que deseja sair?')) {
                window.location.href = 'index.html';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initSidebar();
});
