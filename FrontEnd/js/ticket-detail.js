document.addEventListener('DOMContentLoaded', () => {
    const ticketId = getTicketIdFromUrl();
    const ticketInfoContainer = document.getElementById('ticket-info-container');
    const ticketDetailContent = document.getElementById('ticket-detail-content');
    const loadingIndicator = ticketDetailContent.querySelector('.spinner-border').parentElement;

    if (!ticketId) {
        showError('ID do chamado não fornecido.');
        return;
    }

    fetch(`http://localhost:3000/api/chamado/${ticketId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Chamado não encontrado ou erro na requisição.');
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.chamado) {
                throw new Error('Detalhes do chamado não encontrados.');
            }
            populateTicketDetails(data.chamado);
            loadingIndicator.style.display = 'none';
            ticketInfoContainer.classList.remove('d-none');
        })
        .catch(error => {
            showError(error.message);
        });

    function getTicketIdFromUrl() {
        // Supondo que o ID do chamado esteja na query string, ex: ticket-detail.html?id=123
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    function getStatusClass(status) {
        switch (status) {
            case 'Aberto':
                return 'bg-primary';
            case 'Em Atendimento':
                return 'bg-warning text-dark';
            case 'Resolvido':
                return 'bg-success';
            case 'Fechado':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    }

    let chamadoAtual = null

    function populateTicketDetails(chamado) {
        document.getElementById('ticket-id').textContent = `#${chamado.id}`;
        document.getElementById('ticket-title').textContent = chamado.titulo || 'Sem título';
        document.getElementById('ticket-status').innerHTML = `<span class="badge ${getStatusClass(chamado.status)}">${chamado.status}</span>` || '<span>Desconhecido</span>';
        document.getElementById('ticket-description').textContent = chamado.descricao || 'Sem descrição';
        document.getElementById('ticket-priority').textContent = chamado.prioridade || 'Não definida';
        document.getElementById('ticket-category').textContent = chamado.categoria || 'Não definida';
        document.getElementById('ticket-requester').textContent = chamado.userEmail || 'Não informado';
        document.getElementById('ticket-agent').textContent = chamado.analista || 'Não atribuído';
        document.getElementById('ticket-created-at').textContent = formatDate(chamado.createdAt);
        document.getElementById('ticket-updated-at').textContent = formatDate(chamado.updatedAt);
        chamadoAtual = chamado

        // Histórico do chamado
        const timeline = document.getElementById('ticket-timeline');
        timeline.innerHTML = '';
        if (chamado.historico && chamado.historico.length > 0) {
            chamado.historico.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            chamado.historico.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('timeline-item');
                li.innerHTML = `
                    <span class="timeline-icon"><i class="bi bi-clock-history"></i></span>
                    <div class="timeline-content">
                        <strong>${item.type}</strong> - ${formatDate(item.timestamp)}<br/>
                        ${item.detalhes || ''}
                    </div>
                `;
                timeline.appendChild(li);
            });
        } else {
            timeline.innerHTML = '<li class="timeline-item">Nenhum histórico disponível.</li>';
        }

        // Anexos
        const attachmentsSection = document.getElementById('attachments-section');
        const ul = attachmentsSection.querySelector('ul');
        ul.innerHTML = ''

        if (chamado.anexos && chamado.anexos.length > 0) {
            attachmentsSection.classList.remove('d-none');
            chamado.anexos.forEach(anexo => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = `<i class="bi bi-paperclip me-2"></i>
                ${anexo.nome}`;
                ul.appendChild(li);
            });
        } else {
            attachmentsSection.classList.add('d-none');
        }
    }

    const addCommentForm = document.getElementById('add-comment-form');

    addCommentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const commentText = document.getElementById('comment-text').value.trim();
        const ticketId = getTicketIdFromUrl();
        const email = sessionStorage.getItem('email')

        if (!commentText) {
            alert('Insira um comentário.');
            return;
        }
        try {
            const resposta = await fetch(`http://localhost:3000/api/chamado/${ticketId}/resposta`, {
                method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comentario: commentText, analista: email })
            });

            const data = await resposta.json();

            if (!resposta.ok) {
                throw new Error(data.msg || 'Erro ao enviar o comentário.');
            }

            alert('Comentário enviado');
            document.getElementById('comment-text').value = '';

            populateTicketDetails(data.chamadoAtualizado);

        } catch (erro) {
            console.error(erro)
            alert(`${erro.message}` || 'Erro ao enviar resposta. Tente novamente.');
        }
    })

function showError(message) {
    loadingIndicator.innerHTML = `<p class="text-danger">${message}</p>`;
}

function formatDate(dateString) {
    if (!dateString) return 'Não informado';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}
});
