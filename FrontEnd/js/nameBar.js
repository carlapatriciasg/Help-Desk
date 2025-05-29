 document.addEventListener('DOMContentLoaded', async() =>{
            const email = localStorage.getItem('email')
            let nomeUser = 'Usuário'

            if(email){
                try{
                    const respostas = await fetch(`http://localhost:3000/api/perfil?email=${encodeURIComponent(email)}`)
                    if(respostas.ok){
                        const data = await respostas.json()
                        nomeUser = data.nome || 'Usuário'
                    }
                } catch(erro){
                    console.error('Erro: ', erro)
                }
            }

            document.getElementById('username-header').textContent = nomeUser

            console.log('Nome do usuario:', nomeUser)
        })