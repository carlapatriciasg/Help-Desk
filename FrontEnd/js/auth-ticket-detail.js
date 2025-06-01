export function inicializarTicket() {
    const usuario = JSON.parse(localStorage.getItem('Usuario') || '{}');

    setTimeout(() => {
        const statusDropdown = document.getElementById('status-dropdown-section');
        const checkboxSection = document.getElementById('checkbox-section');
        const commentSection = document.getElementById('card-comment-section');
        const closeButton = document.getElementById('close-ticket-button');
        const ticketStatus = document.getElementById('ticket-status');

        if (ticketStatus && closeButton) {
            const statusText = ticketStatus.textContent.trim().toLowerCase();
            if (statusText === 'fechado') {
                closeButton.style.display = 'none';
            }
        }

        if (usuario.tipoUsuario === 'usuario') {
            if (statusDropdown) statusDropdown.style.display = 'none';
            if (checkboxSection) checkboxSection.style.display = 'none';
            if (commentSection) commentSection.style.display = 'none';
        }
    }, 300);
}
