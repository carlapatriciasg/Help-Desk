export async function contarChamado() {
    const emailAnalista = sessionStorage.getItem('email')

    try {
        const respostas = await fetch(`http://localhost:3000/api/contador-chamados?emailAnalista=${encodeURIComponent(emailAnalista)}`)
        if(!respostas.ok){
            throw new Error('Erro ao realizar a contagem')
        }

        const { abertos, emAtendimento, resolvidos, fechados } = await respostas.json()

        document.getElementById('stat-open').textContent = abertos
        document.getElementById('stat-pending').textContent = emAtendimento
        document.getElementById('stat-resolved').textContent = resolvidos
        document.getElementById('stat-closed').textContent = fechados
    } catch(erro){
        console.error('Erro ao carreger contador', erro)
    }
}
contarChamado();