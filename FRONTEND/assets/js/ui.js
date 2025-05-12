import { getLoggedInUser } from './auth.js';

/**
 * Sets up the toggle functionality for the sidebar on smaller screens.
 */
export function setupSidebarToggle() {
    const toggleButton = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar'); // Use querySelector for flexibility
    const backdrop = document.getElementById('sidebarBackdrop');

    if (toggleButton && sidebar && backdrop) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('show');
            backdrop.style.display = sidebar.classList.contains('show') ? 'block' : 'none';
        });

        // Close sidebar if backdrop is clicked
        backdrop.addEventListener('click', () => {
            if (sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
                backdrop.style.display = 'none';
            }
        });
    } else {
        // console.warn("Sidebar toggle elements not found.");
    }
}

/**
 * Highlights the active navigation link in the sidebar based on the current page.
 */
export function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.sidebar .nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Updates the user dropdown in the header with the logged-in user's name and avatar (placeholder).
 */
export function updateUserDropdown() {
    const user = getLoggedInUser();
    const usernameHeader = document.getElementById('username-header');
    const userAvatarHeader = document.getElementById('user-avatar-header'); // Assuming you might add avatar logic

    if (user && usernameHeader) {
        usernameHeader.textContent = user.name || user.email.split('@')[0]; // Use name or derive from email
        // Update avatar if available
        // userAvatarHeader.src = user.avatarUrl || 'https://via.placeholder.com/32';
    } else if (usernameHeader) {
        usernameHeader.textContent = 'Visitante';
        // userAvatarHeader.src = 'https://via.placeholder.com/32'; // Default avatar
    }
}


/** Helper Functions (moved from data.js) */

// Function to get priority icon class for styling
export function getPriorityClass(priority) {
    switch (priority?.toLowerCase()) {
        case 'baixa': return 'priority-baixa';
        case 'média': return 'priority-media';
        case 'alta': return 'priority-alta';
        case 'crítica': return 'priority-critica';
        default: return '';
    }
}

// Function to get the specific priority icon (Bootstrap Icons)
export function getPriorityIcon(priority) {
     switch (priority?.toLowerCase()) {
        case 'baixa': return 'bi-chevron-down';
        case 'média': return 'bi-dash-lg';
        case 'alta': return 'bi-chevron-up';
        case 'crítica': return 'bi-exclamation-triangle-fill';
        default: return 'bi-question-circle';
    }
}

// Function to get status badge class for styling
export function getStatusClass(status) {
    switch (status?.toLowerCase()) {
        case 'aberto': return 'status-aberto';
        case 'em atendimento': return 'status-atendimento';
        case 'aguardando resposta': return 'status-aguardando';
        case 'resolvido': return 'status-resolvido';
        case 'fechado': return 'status-fechado';
        default: return 'status-aguardando';
    }
}

// Function to format dates into a readable format
export function formatDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        // More robust date parsing and formatting
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
             return dateString; // Return original if invalid
        }
        const options = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit' // Removed seconds for brevity
        };
        // Use 'sv-SE' locale for YYYY-MM-DD format, then replace dashes
        // Or use Intl.DateTimeFormat parts if more complex formatting needed
        let formatted = new Intl.DateTimeFormat('pt-BR', options).format(date);
        // Example: Replace slashes/commas as needed by locale 'pt-BR' gives DD/MM/YYYY, HH:mm
        return formatted;
    } catch (e) {
        console.error("Error formatting date:", dateString, e);
        return dateString; // Fallback to original string on error
    }
}

// Function to get timeline icon based on history item type
export function getTimelineIcon(type) {
     switch (type) {
        case 'creation': return 'bi-pencil-fill';
        case 'comment': return 'bi-chat-left-text-fill';
        case 'status_change': return 'bi-tag-fill';
        case 'assignment': return 'bi-person-fill';
        case 'attachment': return 'bi-paperclip';
        default: return 'bi-info-circle-fill';
    }
}

// Function to get timeline icon CSS class for styling
export function getTimelineIconClass(type) {
     switch (type) {
        case 'creation': return 'creation';
        case 'comment': return 'comment';
        case 'status_change': return 'status-change';
        case 'assignment': return 'assignment'; // Add specific style if needed
        default: return ''; // Default or no specific class
    }
}

/**
 * Displays an error message within a specified container.
 * @param {HTMLElement | null} container The container element to display the error in.
 * @param {string} message The error message.
 */
export function displayError(container, message) {
    if (container) {
        container.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    } else {
        console.error("Error container not found for message:", message);
        alert(message); // Fallback to alert
    }
}

/**
 * Displays a success message (e.g., using an alert for now).
 * @param {string} message The success message.
 */
export function displaySuccess(message) {
    // Could be improved with a toast notification component
    alert(message);
}