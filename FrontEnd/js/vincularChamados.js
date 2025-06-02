function getTicketIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

document.getElementById('selectTicketS').addEventListener('change', async function() {
    const ticketId = getTicketIdFromUrl()
    const isChecked = this.checked

    const emailAnalista = sessionStorage.getItem('email')

    try {
        const resposta = await fetch(`http://localhost:3000/api/chamado/${ticketId}/vincular-analista`,{
          method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                analista: isChecked ? emailAnalista : null
            })  
        })
        if(!resposta.ok){
            throw new Error('Erro ao vincular analista.') 
        }
         const data = await resposta.json();
        alert(`Chamado ${isChecked ? 'atribuído' : 'desatribuído'} com sucesso.`);
        location.reload()
    }catch(erro){
        console.error(erro)
        alert('Erro ao vincular chamado')
    }
})