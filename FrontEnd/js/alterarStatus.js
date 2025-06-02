function getTicketIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', () =>{
    const dropdownItems  = document.querySelectorAll('#dropdown-menu-detail a')
    const dropdownButton = document.getElementById('dropdownStatusButton')
    const email = sessionStorage.getItem('email')

    dropdownItems.forEach(item => {
        item.addEventListener('click', async function (e) {
            e.preventDefault();

            const ticketId = getTicketIdFromUrl();
            const novoStatus = this.dataset.value;

            try {
                const resposta = await fetch(`http://localhost:3000/api/chamado/${ticketId}/status`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: novoStatus, analista: email })
                });
                
                const data = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(data.msg || 'Erro ao fechar chamado.');
                }

                alert('Status do chamado atualizado com sucesso!')

                document.getElementById('ticket-status').textContent = novoStatus
                location.reload()
            }catch(erro){
                console.error(erro)
                alert(`${erro.message}`)
            }
        })
    })
})

document.getElementById('close-ticket-button').addEventListener('click', async () => {
    const ticketId = getTicketIdFromUrl();
    const email = sessionStorage.getItem('email')

    try {
        const resposta = await fetch(`http://localhost:3000/api/chamado/${ticketId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'Fechado', analista: email })
        });

        const data = await resposta.json();
        if (!resposta.ok) {
            throw new Error(data.msg || 'Erro ao fechar chamado');
        }

        alert('Chamado fechado com sucesso!');
        document.getElementById('ticket-status').textContent = 'Fechado';
        location.reload()
    } catch (erro) {
        console.error(erro);
        alert(erro.message || 'Erro interno');
    }
});
