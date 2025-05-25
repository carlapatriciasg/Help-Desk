import { getAllTickets } from '../data.js'; 
import { getStatusClass, getPriorityClass, getPriorityIcon, formatDate } from '../ui.js';

/**
 * Initializes the Ticket List page, fetching and rendering tickets.
 */
export function initTicketList() {
    console.log("Initializing Ticket List...");
    const tableBody = document.getElementById('ticket-list-body');
    const filterButton = document.getElementById('filter-button');
    const exportButton = document.getElementById('export-button');
    const paginationFooter = document.getElementById('pagination-footer');

    if (!tableBody) return;

    // Initial render
    renderTicketList([], tableBody, paginationFooter, true); 

    // Simulate fetching data
    setTimeout(() => {
         try {
             const tickets = getAllTickets(); 
             renderTicketList(tickets, tableBody, paginationFooter);
         } catch(error) {
             console.error("Error fetching tickets:", error);
             tableBody.innerHTML = '<tr><td colspan="8" class="text-center text-danger p-4">Erro ao carregar chamados.</td></tr>';
             if(paginationFooter) paginationFooter.textContent = 'Erro ao carregar.';
         }
    }, 500); 


    // Add basic alert functionality to Filter/Export buttons (placeholder)
    if (filterButton) {
        filterButton.addEventListener('click', () => {
            alert('Funcionalidade de Filtros ainda não implementada.');
        });
    }
    if (exportButton) {
        exportButton.addEventListener('click', () => {
            alert('Funcionalidade de Exportar ainda não implementada.');
        });
    }
}

/**
 * Renders the list of tickets into the table.
 * @param {Array} tickets Array of ticket objects.
 * @param {HTMLTableSectionElement} tableBody The tbody element to populate.
 * @param {HTMLElement} paginationFooter The element to display pagination info.
 * @param {boolean} [loading=false] Indicates if the loading state should be shown.
 */
function renderTicketList(tickets, tableBody, paginationFooter, loading = false) {
    if (!tableBody) return;

    tableBody.innerHTML = ''; 

    if (loading) {
        tableBody.innerHTML = '<tr><td colspan="8" class="text-center p-5"><div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div> Carregando chamados...</td></tr>';
        if(paginationFooter) paginationFooter.textContent = 'Carregando...';
        return;
    }

    if (tickets.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="text-center p-4">Nenhum chamado encontrado.</td></tr>';
         if(paginationFooter) paginationFooter.textContent = 'Nenhum chamado para exibir.';
        return;
    }

    tickets.forEach(ticket => {
        const row = tableBody.insertRow();
        row.style.cursor = 'pointer';
        row.setAttribute('data-ticket-id', ticket.id); 
        row.addEventListener('click', () => {
            window.location.href = `ticket-detail.html?id=${ticket.id}`;
        });

        row.innerHTML = `
            <td><a href="ticket-detail.html?id=${ticket.id}" onclick="event.stopPropagation()" class="fw-medium">${ticket.id}</a></td>
            <td>${escapeHTML(ticket.title)}</td>
            <td><span class="status-badge ${getStatusClass(ticket.status)}">${escapeHTML(ticket.status)}</span></td>
            <td><i class="bi ${getPriorityIcon(ticket.priority)} ${getPriorityClass(ticket.priority)} priority-icon" title="${escapeHTML(ticket.priority)}"></i> ${escapeHTML(ticket.priority)}</td>
            <td>${escapeHTML(ticket.category)} / ${escapeHTML(ticket.subcategory)}</td>
            <td>${escapeHTML(ticket.agent || 'Não atribuído')}</td>
            <td>${formatDate(ticket.createdAt)}</td>
            <td>${formatDate(ticket.updatedAt)}</td>
        `;
    });

    if (paginationFooter) {
        paginationFooter.textContent = `Exibindo ${tickets.length} de ${tickets.length} chamados.`;
    }
}

/**
 * Basic HTML escaping function.
 * @param {string | null | undefined} str The string to escape.
 * @returns {string} The escaped string.
 */
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
         .replace(/&/g, '&amp;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(/"/g, '&quot;')
         .replace(/'/g, '&#039;');
}