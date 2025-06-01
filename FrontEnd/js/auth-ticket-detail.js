export function inicializarTicket() {
    const usuario = JSON.parse(localStorage.getItem('Usuario') || '{}');

    // Esconde a area de comentario, dropdown de status e o checkbox se o tipo de usuário for "usuario"
    if (usuario.tipoUsuario === 'usuario') {
        const statusDropdown = document.getElementById('status-dropdown-section');
        const checkboxSection = document.getElementById('checkbox-section');
        const commentSection = document.getElementById('card-comment-section');

        if (statusDropdown) statusDropdown.style.display = 'none';
        if (checkboxSection) checkboxSection.style.display = 'none';
        if (commentSection) commentSection.style.display = 'none';
    }
}