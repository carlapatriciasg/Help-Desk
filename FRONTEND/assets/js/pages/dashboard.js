import { getDashboardStats, getRecentActivity } from '../data.js';
import { formatDate, getStatusClass } from '../ui.js';

/**
 * Initializes the dashboard page elements.
 */
export function initDashboard() {
    console.log("Initializing Dashboard...");
    updateDashboardStats();
    populateRecentActivityList();
}

/**
 * Fetches and updates the statistics cards on the dashboard.
 */
function updateDashboardStats() {
    const stats = getDashboardStats(); // Get stats from data.js

    const statOpenEl = document.getElementById('stat-open');
    const statPendingEl = document.getElementById('stat-pending');
    const statResolvedEl = document.getElementById('stat-resolved');
    const statClosedEl = document.getElementById('stat-closed');

    if (statOpenEl) statOpenEl.textContent = stats.open ?? '0';
    if (statPendingEl) statPendingEl.textContent = stats.inProgress ?? '0';
    if (statResolvedEl) statResolvedEl.textContent = stats.resolved ?? '0';
    if (statClosedEl) statClosedEl.textContent = stats.closed ?? '0';
}

/**
 * Fetches recent activity and populates the recent activity list.
 */
function populateRecentActivityList() {
    const recentActivityList = document.getElementById('recent-activity-list');
    if (!recentActivityList) return;

    recentActivityList.innerHTML = '<div class="text-center p-3"><div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div></div>'; // Loading indicator

    try {
        const recentTickets = getRecentActivity(5); // Get last 5 activities

        if (recentTickets.length === 0) {
            recentActivityList.innerHTML = '<p class="text-muted p-3 small text-center">Nenhuma atividade recente.</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'list-group list-group-flush small';

        recentTickets.forEach(ticket => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            // Determine if it was creation or update based on history or timestamps
            const lastAction = ticket.history[ticket.history.length - 1]?.type === 'creation' ? 'Criado' : 'Atualizado';

            li.innerHTML = `
                <div>
                    <a href="ticket-detail.html?id=${ticket.id}" class="text-decoration-none fw-medium">${ticket.id}: ${ticket.title.substring(0, 35)}${ticket.title.length > 35 ? '...' : ''}</a>
                    <br>
                    <span class="text-muted">${lastAction} ${formatDate(ticket.updatedAt)}</span>
                </div>
                <span class="status-badge ${getStatusClass(ticket.status)}">${ticket.status}</span>
            `;
            ul.appendChild(li);
        });
        recentActivityList.innerHTML = ''; // Clear loading indicator
        recentActivityList.appendChild(ul);
    } catch (error) {
        console.error("Error populating recent activity:", error);
        recentActivityList.innerHTML = '<p class="text-danger p-3 small text-center">Erro ao carregar atividades.</p>';
    }
}