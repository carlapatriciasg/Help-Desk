export function inicializarDashboard() {
    const usuario = JSON.parse(localStorage.getItem('Usuario') || '{}');
    

    if (!usuario || !usuario.tipoUsuario) {
        alert('Sessão inválida. Faça login novamente.');
        window.location.href = '/FrontEnd/pages/login.html';
        return;
    }

    // Esconde os cards se não for analista
    if (usuario.tipoUsuario !== 'analista') {
        const cards = document.getElementById('cards-analista');
        if (cards) cards.style.display = 'none';
    }

    // Oculta os botões de abrir chamado se for analista
    if (usuario.tipoUsuario === 'analista') {
        document.querySelectorAll('.btn-abrir-chamado').forEach(btn => {
            btn.style.display = 'none';
        });
    }
}

