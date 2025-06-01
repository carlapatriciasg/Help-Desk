function getTicketIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', () =>{
    const dropdownItems  = document.querySelectorAll('#dropdown-menu-detail a')
    const dropdownButton = document.getElementById('dropdownStatusButton')

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
                    body: JSON.stringify({ status: novoStatus })
                });
                
                if(!resposta.ok){
                    throw new Error('Erro ao atualizar o status.');
                }
                const data = await resposta.json()

                alert('Status do chamado atualizado com sucesso!')

                document.getElementById('ticket-status').textContent = novoStatus
                
            }catch(erro){
                console.error(erro)
                alert('Erro ao atualizar o status')
            }
        })
    })
})

document.getElementById('close-ticket-button').addEventListener('click', async () => {
    const ticketId = getTicketIdFromUrl();

    try {
        const resposta = await fetch(`http://localhost:3000/api/chamado/${ticketId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'Fechado' })
        });

        if (!resposta.ok) {
            throw new Error('Erro ao fechar chamado');
        }

        const data = await resposta.json();
        alert('Chamado fechado com sucesso!');
        document.getElementById('ticket-status').textContent = 'Fechado';

    } catch (erro) {
        console.error(erro);
        alert('Erro ao fechar o chamado');
    }
});
