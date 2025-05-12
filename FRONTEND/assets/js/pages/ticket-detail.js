import { getTicketById, addHistoryItem, updateTicketStatus } from '../data.js';
import { getLoggedInUser } from '../auth.js';
import { getStatusClass, getPriorityClass, getPriorityIcon, formatDate, getTimelineIcon, getTimelineIconClass, displayError, displaySuccess } from '../ui.js';

let currentTicket = null; // Store the current ticket data locally

/**
 * Initializes the Ticket Detail page.
 */
export function initTicketDetail() {
    console.log("Initializing Ticket Detail...");
    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get('id');
    const detailContent = document.getElementById('ticket-detail-content');
    const loadingIndicator = detailContent?.querySelector('.loading-indicator'); // Use a class for the loader
    const ticketInfoContainer = document.getElementById('ticket-info-container');

    // Ensure elements exist before proceeding
    if (!detailContent || !ticketInfoContainer) {
         console.error("Essential ticket detail elements not found.");
         // Optionally display a general page error
         document.body.innerHTML = '<div class="alert alert-danger m-5">Erro ao carregar a página de detalhes do chamado. Elementos essenciais não encontrados.</div>';
         return;
    }

    // Show loading indicator initially
    if(loadingIndicator) loadingIndicator.classList.remove('d-none');
    ticketInfoContainer.classList.add('d-none');


    if (!ticketId) {
        displayError(detailContent, 'ID do chamado não fornecido na URL.');
        if(loadingIndicator) loadingIndicator.classList.add('d-none');
        return;
    }

    // Simulate fetching data
    setTimeout(() => {
        try {
            currentTicket = getTicketById(ticketId); // Fetch and store the ticket data

            if (!currentTicket) {
                displayError(detailContent, `Chamado ${ticketId} não encontrado.`);
                if(loadingIndicator) loadingIndicator.classList.add('d-none');
                return;
            }

            // Populate details
            populateTicketDetails(currentTicket);

            // Show the main content and hide loading indicator
            if (loadingIndicator) loadingIndicator.classList.add('d-none');
            ticketInfoContainer.classList.remove('d-none');

            // Setup Action Buttons and Comment Form based on fetched ticket
            setupTicketActions(currentTicket);
            setupCommentForm(currentTicket);

        } catch (error) {
            console.error("Error fetching or processing ticket details:", error);
            displayError(detailContent, `Erro ao carregar detalhes do chamado ${ticketId}.`);
            if(loadingIndicator) loadingIndicator.classList.add('d-none');
        }
    }, 300); // Simulate network delay
}

/**
 * Populates the ticket detail fields on the page.
 * @param {object} ticket The ticket data object.
 */
function populateTicketDetails(ticket) {
    if (!ticket) return;

    // Helper to safely set text content
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text ?? 'N/A';
    };
    // Helper to safely set inner HTML (use with caution)
    const setHTML = (id, html) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html ?? 'N/A';
    };

    // Update header ID
    setText('ticket-id-header', ticket.id);

    // Populate main details card
    setText('ticket-id', ticket.id);
    setText('ticket-title', ticket.title);
    const statusEl = document.getElementById('ticket-status');
    if (statusEl) {
        statusEl.textContent = ticket.status;
        statusEl.className = `status-badge ${getStatusClass(ticket.status)}`;
    }
    setText('ticket-description', ticket.description); // Assumes description is plain text
    // If description allows HTML/Markdown, it needs sanitization before setting innerHTML

    // Populate information card
    setHTML('ticket-priority', `<i class="bi ${getPriorityIcon(ticket.priority)} ${getPriorityClass(ticket.priority)} priority-icon"></i> ${ticket.priority}`);
    setText('ticket-category', `${ticket.category} / ${ticket.subcategory}`);
    setText('ticket-requester', ticket.requester); // Consider adding link or email if available
    setText('ticket-agent', ticket.agent || 'Não atribuído');
    setText('ticket-created-at', formatDate(ticket.createdAt));
    setText('ticket-updated-at', formatDate(ticket.updatedAt));

    // Populate timeline/history
    renderTimeline(ticket.history);

    // Populate attachments (if any) - Placeholder logic
    // const attachmentsSection = document.getElementById('attachments-section');
    // Handle attachments rendering here if data includes them
}

/**
 * Renders the ticket history/timeline.
 * @param {Array} history Array of history event objects.
 */
function renderTimeline(history) {
    const timelineElement = document.getElementById('ticket-timeline');
    if (!timelineElement) return;

    timelineElement.innerHTML = ''; // Clear placeholder or previous items

    if (!history || history.length === 0) {
        // Keep the structure but show a message
        timelineElement.innerHTML = `
            <li class="timeline-item">
                <span class="timeline-icon timeline-icon-empty"><i class="bi bi-clock-history"></i></span>
                <div class="timeline-content text-muted fst-italic">
                    Nenhum histórico registrado para este chamado ainda.
                </div>
            </li>`;
        return;
    }

    // Sort history by timestamp (should already be sorted, but good practice)
    const sortedHistory = [...history].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    sortedHistory.forEach(item => {
        const li = document.createElement('li');
        li.className = 'timeline-item';

        // Sanitize user-generated content before inserting as HTML
        const safeDetails = escapeHTML(item.details).replace(/\n/g, '<br>'); // Allow line breaks safely
        const safeUser = escapeHTML(item.user || 'Sistema');

        li.innerHTML = `
            <span class="timeline-icon ${getTimelineIconClass(item.type)}">
                <i class="bi ${getTimelineIcon(item.type)}"></i>
            </span>
            <div class="timeline-content">
                <div class="timeline-time small text-muted">${formatDate(item.timestamp)}</div>
                <div><strong class="timeline-author me-1">${safeUser}:</strong> ${safeDetails}</div>
                <!-- Add logic here for attachments if item.attachments exists and needs display -->
            </div>
        `;
        timelineElement.appendChild(li);
    });
}

/**
 * Sets up event listeners and visibility for ticket action buttons.
 * @param {object} ticket The ticket data object.
 */
function setupTicketActions(ticket) {
    const editButton = document.getElementById('edit-ticket-button');
    const closeButton = document.getElementById('close-ticket-button');
    const reopenButton = document.getElementById('reopen-ticket-button');
    const user = getLoggedInUser(); // Get current user info

    if (!user) {
        console.warn("No logged in user found, disabling actions.");
        if(editButton) editButton.style.display = 'none';
        if(closeButton) closeButton.style.display = 'none';
        if(reopenButton) reopenButton.style.display = 'none';
        return;
    }

    const userName = user.name || user.email; // Use name or email

    // --- Edit Button Logic ---
    if (editButton) {
        // Basic alert functionality for now - Placeholder
        editButton.addEventListener('click', () => alert('Funcionalidade "Editar Chamado" não implementada nesta simulação.'));
        // Hide edit button if ticket is closed or resolved (adjust logic as needed)
        editButton.style.display = ['Resolvido', 'Fechado'].includes(ticket.status) ? 'none' : 'block';
    }

    // --- Close Button Logic ---
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja marcar o chamado ${ticket.id} como Fechado?`)) {
                if (updateTicketStatus(ticket.id, 'Fechado', userName)) {
                    displaySuccess(`Chamado ${ticket.id} marcado como Fechado.`);
                    // Refresh ticket details on the page
                    currentTicket = getTicketById(ticket.id); // Re-fetch the updated ticket data
                    populateTicketDetails(currentTicket);
                    setupTicketActions(currentTicket); // Re-setup buttons based on new status
                } else {
                    displayError('Erro ao fechar o chamado.');
                }
            }
        });
        closeButton.style.display = ['Aberto', 'Em Atendimento', 'Aguardando Resposta'].includes(ticket.status) ? 'block' : 'none';
    }

    // --- Reopen Button Logic ---
    if (reopenButton) {
        reopenButton.addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja reabrir o chamado ${ticket.id}?`)) {
                if (updateTicketStatus(ticket.id, 'Aberto', userName)) {
                    displaySuccess(`Chamado ${ticket.id} reaberto.`);
                    // Refresh ticket details on the page
                    currentTicket = getTicketById(ticket.id); // Re-fetch the updated ticket data
                    populateTicketDetails(currentTicket);
                    setupTicketActions(currentTicket); // Re-setup buttons based on new status
                } else {
                    displayError('Erro ao reabrir o chamado.');
                }
            }
        });
        reopenButton.style.display = ['Fechado', 'Resolvido'].includes(ticket.status) ? 'block' : 'none';
    }
}

/**
 * Sets up the comment form for the ticket.
 * @param {object} ticket The ticket data object.
 */
function setupCommentForm(ticket) {
    const commentForm = document.getElementById('add-comment-form');
    const commentText = document.getElementById('comment-text');
    const submitButton = commentForm?.querySelector('button[type="submit"]');
    const user = getLoggedInUser(); // Get current user info

    if (!commentForm || !commentText || !submitButton) return;

    // Enable form if ticket is not closed/resolved
    const isClosedOrResolved = ['Resolvido', 'Fechado'].includes(ticket.status);
    if (!isClosedOrResolved) {
        commentText.disabled = false;
        submitButton.disabled = false;
    } else {
        commentText.disabled = true;
        commentText.placeholder = 'Este chamado está fechado ou resolvido e não pode mais receber comentários.';
        submitButton.disabled = true;
    }

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentValue = commentText.value.trim();

        if (!commentValue) {
            displayError('Por favor, digite um comentário.');
            return;
        }

        // Simulate adding the comment
        if (addHistoryItem(ticket.id, 'comment', user.name, commentValue)) {
            console.log('Comment added successfully (simulated)');
            commentText.value = ''; // Clear textarea

            // Refresh the timeline
            const updatedTicket = getTicketById(ticket.id); // Fetch ticket again to get updated history
            if (updatedTicket) {
                renderTimeline(updatedTicket.history);
                // Also update the "Updated At" field displayed
                document.getElementById('ticket-updated-at').textContent = formatDate(updatedTicket.updatedAt);
            }
        } else {
            displayError('Erro ao adicionar comentário.');
        }
    });
}

// Helper to escape HTML to prevent XSS
function escapeHTML(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}