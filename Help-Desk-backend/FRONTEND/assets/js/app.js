import { mockTickets, mockCategories, mockUsers, getTicketById, addTicket, addHistoryItem, updateTicketStatus, getStatusClass, getPriorityClass, getPriorityIcon, formatDate, getTimelineIcon, getTimelineIconClass, getDashboardStats } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    setupGlobalEventListeners();
    setupSidebarToggle(); // Ensure sidebar toggle is set up early
    setActiveNavLink(); // Highlight active link on page load
    checkLoginStatus(); // Check if user is logged in on applicable pages

    // Page specific initializations
    if (document.getElementById('dashboard-page')) {
        initDashboard();
    }
    if (document.getElementById('new-ticket-page')) {
        initNewTicketForm();
    }
    if (document.getElementById('ticket-list-page')) {
        initTicketList();
    }
    if (document.getElementById('ticket-detail-page')) {
        initTicketDetail();
    }
    if (document.getElementById('profile-page')) {
        initProfilePage();
    }
    if (document.getElementById('login-page')) {
        // Login page specific logic (if any besides the inline script)
    }

    // Common element updates (only if user is logged in)
    if (localStorage.getItem('loggedInUser')) {
        updateUserDropdown();
    }
});

// Check login status for protected pages
function checkLoginStatus() {
    const protectedPages = ['dashboard.html', 'new-ticket.html', 'ticket-list.html', 'ticket-detail.html', 'profile.html'];
    const currentPage = window.location.pathname.split('/').pop();

    // Check if current page is protected AND user is not logged in
    if (protectedPages.includes(currentPage) && !localStorage.getItem('loggedInUser')) {
        console.warn('User not logged in. Redirecting to login page.');
        window.location.href = 'login.html';
    }
}

function setupGlobalEventListeners() {
    // Logout functionality (ensure both header and potential sidebar buttons work)
    const logoutButtons = document.querySelectorAll('#logout-button, #logout-button-sidebar');
    logoutButtons.forEach(button => {
        if(button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('loggedInUser');
                window.location.href = 'login.html';
            });
        }
    });

    // Handle sidebar link clicks (if needed for SPA-like behavior simulation)
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            // If sidebar is open on mobile, close it after click
            const sidebar = document.getElementById('sidebar');
            const backdrop = document.getElementById('sidebarBackdrop');
            if (sidebar && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
                if (backdrop) backdrop.style.display = 'none';
            }
        });
    });

    // Close sidebar if backdrop is clicked
    const backdrop = document.getElementById('sidebarBackdrop');
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
                backdrop.style.display = 'none';
            }
        });
    }
}

function setupSidebarToggle() {
    const toggleButton = document.querySelector('.sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');

    if (toggleButton && sidebar && backdrop) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('show');
            backdrop.style.display = sidebar.classList.contains('show') ? 'block' : 'none';
        });
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop(); // Get 'dashboard.html', 'ticket-list.html', etc.
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

function updateUserDropdown() {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const usernameHeader = document.getElementById('username-header');
    const userAvatarHeader = document.getElementById('user-avatar-header'); // Assuming you might add avatar logic

    if (loggedInUserEmail && usernameHeader) {
        const user = mockUsers[loggedInUserEmail] || { name: loggedInUserEmail.split('@')[0] }; // Fallback
        usernameHeader.textContent = user.name;
        // Add avatar update logic here if available, e.g.:
        // userAvatarHeader.src = user.avatarUrl || 'https://via.placeholder.com/32';
    } else if (usernameHeader) {
        usernameHeader.textContent = 'Visitante'; // Or handle not logged in state
    }
}

function initDashboard() {
    console.log("Initializing Dashboard...");
    const stats = getDashboardStats(); // Get stats from data.js

    const statOpenEl = document.getElementById('stat-open');
    const statPendingEl = document.getElementById('stat-pending');
    const statResolvedEl = document.getElementById('stat-resolved');
    const statClosedEl = document.getElementById('stat-closed');

    if (statOpenEl) statOpenEl.textContent = stats.open;
    if (statPendingEl) statPendingEl.textContent = stats.inProgress;
    if (statResolvedEl) statResolvedEl.textContent = stats.resolved;
    if (statClosedEl) statClosedEl.textContent = stats.closed;

    // Add logic to populate recent activity if needed
    const recentActivityList = document.querySelector('#recent-activity-list'); // Assuming you add this ID
    if (recentActivityList) {
        populateRecentActivity(recentActivityList);
    }
}

function populateRecentActivity(listElement) {
    listElement.innerHTML = ''; // Clear placeholder

    // Get the last 5 ticket updates/creations (simple simulation)
    const sortedTickets = [...mockTickets].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    const recentTickets = sortedTickets.slice(0, 5);

    if (recentTickets.length === 0) {
        listElement.innerHTML = '<p class="text-muted small">Nenhuma atividade recente para mostrar.</p>';
        return;
    }

    const ul = document.createElement('ul');
    ul.className = 'list-group list-group-flush small';

    recentTickets.forEach(ticket => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        const updateText = ticket.createdAt === ticket.updatedAt ? 'Criado' : 'Atualizado';
        li.innerHTML = `
            <div>
                <a href="ticket-detail.html?id=${ticket.id}" class="text-decoration-none">${ticket.id}: ${ticket.title.substring(0, 30)}...</a>
                <br>
                <span class="text-muted">${updateText} ${formatDate(ticket.updatedAt)}</span>
            </div>
            <span class="status-badge ${getStatusClass(ticket.status)}">${ticket.status}</span>
        `;
        ul.appendChild(li);
    });
    listElement.appendChild(ul);
}

function initNewTicketForm() {
    console.log("Initializing New Ticket Form...");
    const categorySelect = document.getElementById('category');
    const subcategorySelect = document.getElementById('subcategory');

    // Populate categories
    if (categorySelect) {
        Object.keys(mockCategories).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });

        // Add event listener to update subcategories
        categorySelect.addEventListener('change', (event) => {
            const selectedCategory = event.target.value;
            updateSubcategories(selectedCategory, subcategorySelect);
        });

        // Initial population if a category is pre-selected (e.g., on error)
        if(categorySelect.value) {
            updateSubcategories(categorySelect.value, subcategorySelect);
        }
    }

    // Handle form submission
    const form = document.getElementById('new-ticket-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            // Basic validation example
            if (!categorySelect.value || !subcategorySelect.value || !document.getElementById('title').value || !document.getElementById('description').value) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            const formData = {
                category: categorySelect.value,
                subcategory: subcategorySelect.value,
                priority: document.getElementById('priority').value,
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                // Add attachment handling later
            };

            const newTicket = addTicket(formData); // Simulate adding the ticket
            alert(`Chamado ${newTicket.id} criado com sucesso!`);
            window.location.href = `ticket-detail.html?id=${newTicket.id}`; // Redirect to detail page

            // Or update UI without redirect, e.g., clear form and show success message
            // form.reset();
            // updateSubcategories('', subcategorySelect); // Clear subcategories
        });
    }
}

function updateSubcategories(category, subcategorySelect) {
    if (!subcategorySelect) return;

    // Clear existing options (except placeholder if it exists)
    subcategorySelect.innerHTML = '<option value="" disabled selected>Selecione a subcategoria</option>';
    subcategorySelect.disabled = true; // Disable initially

    if (category && mockCategories[category]) {
        mockCategories[category].forEach(sub => {
            const option = document.createElement('option');
            option.value = sub;
            option.textContent = sub;
            subcategorySelect.appendChild(option);
        });
        subcategorySelect.disabled = false; // Enable if category has subcategories
    }
}

function initTicketList() {
    console.log("Initializing Ticket List...");
    const tableBody = document.getElementById('ticket-list-body');
    const filterButton = document.getElementById('filter-button');
    const exportButton = document.getElementById('export-button');
    const paginationFooter = document.getElementById('pagination-footer');

    if (!tableBody) return;

    // Simulate filtering (just show all for now)
    renderTicketList(mockTickets, tableBody);

    // Add basic alert functionality to Filter/Export buttons
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

    // Update pagination text (simple example)
    if(paginationFooter) {
        paginationFooter.textContent = `Exibindo ${mockTickets.length} de ${mockTickets.length} chamados.`;
    }
}

function renderTicketList(tickets, tableBody) {
    tableBody.innerHTML = ''; // Clear existing rows

    if (tickets.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="text-center p-4">Nenhum chamado encontrado.</td></tr>';
        return;
    }

    tickets.forEach(ticket => {
        const row = tableBody.insertRow();
        row.style.cursor = 'pointer'; // Indicate clickable row
        row.addEventListener('click', () => {
            window.location.href = `ticket-detail.html?id=${ticket.id}`;
        });
        row.innerHTML = `
            <td><a href="ticket-detail.html?id=${ticket.id}" onclick="event.stopPropagation()">${ticket.id}</a></td>
            <td>${ticket.title}</td>
            <td><span class="status-badge ${getStatusClass(ticket.status)}">${ticket.status}</span></td>
            <td><i class="bi ${getPriorityIcon(ticket.priority)} ${getPriorityClass(ticket.priority)} priority-icon" title="${ticket.priority}"></i> ${ticket.priority}</td>
            <td>${ticket.category} / ${ticket.subcategory}</td>
            <td>${ticket.agent || 'Não atribuído'}</td>
            <td>${formatDate(ticket.createdAt)}</td>
            <td>${formatDate(ticket.updatedAt)}</td>
        `;
    });
}

function initTicketDetail() {
    console.log("Initializing Ticket Detail...");
    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get('id');
    const detailContent = document.getElementById('ticket-detail-content');
    const loadingIndicator = detailContent?.querySelector('.text-center'); // Get the initial loading indicator
    const ticketInfoContainer = document.getElementById('ticket-info-container');

    if (!ticketId) {
        displayTicketError(detailContent, 'ID do chamado não encontrado.');
        return;
    }

    let ticket = getTicketById(ticketId); // Use let as we might update it

    if (!ticket) {
        displayTicketError(detailContent, `Chamado ${ticketId} não encontrado.`);
        return;
    }

    // Populate details
    populateTicketDetails(ticket);

    // Show the main content and hide loading indicator
    if (loadingIndicator) loadingIndicator.classList.add('d-none');
    if (ticketInfoContainer) ticketInfoContainer.classList.remove('d-none');

    // Setup Action Buttons and Comment Form
    setupTicketActions(ticket);
    setupCommentForm(ticket);
}

function displayTicketError(container, message) {
    if (container) {
        container.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }
}

function populateTicketDetails(ticket) {
    // Update header ID
    document.getElementById('ticket-id-header').textContent = ticket.id;

    // Populate main details
    document.getElementById('ticket-id').textContent = ticket.id;
    document.getElementById('ticket-title').textContent = ticket.title;
    const statusEl = document.getElementById('ticket-status');
    statusEl.textContent = ticket.status;
    statusEl.className = `status-badge ${getStatusClass(ticket.status)}`;
    document.getElementById('ticket-priority').innerHTML = `<i class="bi ${getPriorityIcon(ticket.priority)} ${getPriorityClass(ticket.priority)} priority-icon"></i> ${ticket.priority}`;
    document.getElementById('ticket-requester').textContent = ticket.requester;
    document.getElementById('ticket-agent').textContent = ticket.agent || 'Não atribuído';
    document.getElementById('ticket-created-at').textContent = formatDate(ticket.createdAt);
    document.getElementById('ticket-updated-at').textContent = formatDate(ticket.updatedAt);
    document.getElementById('ticket-category').textContent = `${ticket.category} / ${ticket.subcategory}`;
    document.getElementById('ticket-description').textContent = ticket.description;

    // Populate timeline/history
    renderTimeline(ticket.history);
}

function renderTimeline(history) {
    const timelineElement = document.getElementById('ticket-timeline');
    if (!timelineElement) return;

    timelineElement.innerHTML = ''; // Clear placeholder or previous items
    if (!history || history.length === 0) {
        timelineElement.innerHTML = '<li class="timeline-item"><div class="timeline-content text-muted">Nenhum histórico para este chamado.</div></li>';
        return;
    }

    // Sort history by timestamp just in case
    history.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    history.forEach(item => {
        const li = document.createElement('li');
        li.className = 'timeline-item';
        li.innerHTML = `
            <span class="timeline-icon ${getTimelineIconClass(item.type)}">
                <i class="bi ${getTimelineIcon(item.type)}"></i>
            </span>
            <div class="timeline-content">
                <div class="timeline-time">${formatDate(item.timestamp)}</div>
                <div><strong class="timeline-author">${item.user || 'Sistema'}</strong> ${item.details.replace(/\n/g, '<br>')}</div>
                <!-- Add logic here for attachments if item.attachments exists -->
            </div>
        `;
        timelineElement.appendChild(li);
    });
}

function setupTicketActions(ticket) {
    const editButton = document.getElementById('edit-ticket-button');
    const closeButton = document.getElementById('close-ticket-button');
    const reopenButton = document.getElementById('reopen-ticket-button');
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const user = mockUsers[loggedInUserEmail] || { name: 'Usuário' };

    // Basic alert functionality for now
    if (editButton) {
        editButton.addEventListener('click', () => alert('Funcionalidade "Editar Chamado" não implementada.'));
    }
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja marcar o chamado ${ticket.id} como Fechado?`)) {
                if (updateTicketStatus(ticket.id, 'Fechado', user.name)) {
                    alert(`Chamado ${ticket.id} marcado como Fechado.`);
                    // Refresh ticket details on the page
                    ticket = getTicketById(ticket.id); // Re-fetch the updated ticket data
                    populateTicketDetails(ticket);
                    setupTicketActions(ticket); // Re-setup buttons based on new status
                } else {
                    alert(`Erro ao fechar o chamado ${ticket.id}.`);
                }
            }
        });
    }
    if (reopenButton) {
        reopenButton.addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja reabrir o chamado ${ticket.id}?`)) {
                if (updateTicketStatus(ticket.id, 'Aberto', user.name)) {
                    alert(`Chamado ${ticket.id} reaberto.`);
                    // Refresh ticket details on the page
                    ticket = getTicketById(ticket.id); // Re-fetch the updated ticket data
                    populateTicketDetails(ticket);
                    setupTicketActions(ticket); // Re-setup buttons based on new status
                } else {
                    alert(`Erro ao reabrir o chamado ${ticket.id}.`);
                }
            }
        });
    }

    // Show/hide buttons based on status
    const isClosedOrResolved = ['resolvido', 'fechado'].includes(ticket.status?.toLowerCase());
    if (editButton) editButton.style.display = isClosedOrResolved ? 'none' : 'block';
    if (closeButton) closeButton.style.display = isClosedOrResolved ? 'none' : 'block';
    if (reopenButton) reopenButton.style.display = isClosedOrResolved ? 'block' : 'none';
}

function setupCommentForm(ticket) {
    const commentForm = document.getElementById('add-comment-form');
    const commentText = document.getElementById('comment-text');
    const submitButton = commentForm?.querySelector('button[type="submit"]');
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const user = mockUsers[loggedInUserEmail] || { name: 'Usuário' };

    if (!commentForm || !commentText || !submitButton) return;

    // Enable form if ticket is not closed/resolved
    const isClosedOrResolved = ['resolvido', 'fechado'].includes(ticket.status?.toLowerCase());
    if (!isClosedOrResolved) {
        commentText.disabled = false;
        submitButton.disabled = false;
        // attachmentInput.disabled = false; // If attachments were enabled
    } else {
        commentText.disabled = true;
        commentText.placeholder = 'Este chamado está fechado ou resolvido e não pode mais receber comentários.';
        submitButton.disabled = true;
        // attachmentInput.disabled = true;
    }

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentValue = commentText.value.trim();

        if (!commentValue) {
            alert('Por favor, digite um comentário.');
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
            alert('Erro ao adicionar comentário.');
        }
    });
}

function initProfilePage() {
    console.log("Initializing Profile Page...");
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        // Handle not logged in state, maybe redirect
        window.location.href = 'login.html';
        return;
    }

    const user = mockUsers[loggedInUserEmail];
    if (!user) {
        console.error("User data not found for:", loggedInUserEmail);
        // Show error or default values
        return;
    }

    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    const departmentInput = document.getElementById('profileDepartment');
    const roleInput = document.getElementById('profileRole');

    if (nameInput) nameInput.value = user.name || '';
    if (emailInput) emailInput.value = loggedInUserEmail; // Email is the key
    if (departmentInput) departmentInput.value = user.department || '';
    if (roleInput) roleInput.value = user.role || '';

    // Add event listener for form submission to save changes (mocked)
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, send data to backend
            console.log("Profile update submitted (simulated):", {
                name: nameInput.value,
                department: departmentInput.value,
                role: roleInput.value,
                // Don't send email or password changes without proper handling
            });
            alert("Perfil atualizado com sucesso (simulado)!");
        });
    }

    const changePasswordForm = document.getElementById('change-password-form');
    if(changePasswordForm) {
        changePasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
                alert("As novas senhas não coincidem.");
                return;
            }
            if (newPassword.length < 6) { // Basic validation
                alert("A nova senha deve ter pelo menos 6 caracteres.");
                return;
            }

            // In a real app, validate currentPassword and update
            console.log("Password change submitted (simulated)");
            alert("Senha alterada com sucesso (simulado)!");
            changePasswordForm.reset();
        });
    }
}