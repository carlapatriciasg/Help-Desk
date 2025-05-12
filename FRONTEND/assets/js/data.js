// Mock Data for Help Desk Simulation

const mockTickets = [
    {
        id: 'HD-001',
        title: 'Impressora não imprime na rede',
        requester: 'João Silva',
        requesterEmail: 'joao.silva@empresa.com',
        category: 'TI',
        subcategory: 'Hardware',
        priority: 'Alta',
        status: 'Aberto',
        agent: null,
        createdAt: '2024-07-25T09:15:00Z',
        updatedAt: '2024-07-25T09:15:00Z',
        description: 'A impressora do setor financeiro (HP LaserJet Pro M404dn) parou de funcionar na rede. Ninguém consegue imprimir nela. Já reiniciamos a impressora e os computadores.',
        history: [
            { type: 'creation', user: 'João Silva', timestamp: '2024-07-25T09:15:00Z', details: 'Chamado criado.' }
        ]
    },
    {
        id: 'HD-002',
        title: 'Solicitação de reembolso - Viagem SP',
        requester: 'Lucas Andrade',
        requesterEmail: 'lucas.andrade@empresa.com',
        category: 'Financeiro',
        subcategory: 'Reembolso',
        priority: 'Média',
        status: 'Em Atendimento',
        agent: 'Ana Costa',
        createdAt: '2024-07-24T14:30:00Z',
        updatedAt: '2024-07-25T10:05:00Z',
        description: 'Solicito reembolso das despesas da viagem a São Paulo realizada entre 20/07 e 22/07. Notas fiscais anexadas.',
        history: [
            { type: 'creation', user: 'Lucas Andrade', timestamp: '2024-07-24T14:30:00Z', details: 'Chamado criado.' },
            { type: 'assignment', user: 'Sistema', timestamp: '2024-07-24T15:00:00Z', details: 'Chamado atribuído a Ana Costa.' },
            { type: 'status_change', user: 'Ana Costa', timestamp: '2024-07-25T10:05:00Z', details: 'Status alterado para Em Atendimento.' }
        ]
    },
    {
        id: 'HD-003',
        title: 'Reset de senha do e-mail corporativo',
        requester: 'Mariana Santos',
        requesterEmail: 'mariana.santos@empresa.com',
        category: 'TI',
        subcategory: 'Acessos',
        priority: 'Alta',
        status: 'Resolvido',
        agent: 'Carlos Pereira',
        createdAt: '2024-07-23T11:00:00Z',
        updatedAt: '2024-07-23T11:45:00Z',
        description: 'Esqueci a senha do meu e-mail corporativo e não consigo acessar. Preciso de um reset urgente.',
        history: [
             { type: 'creation', user: 'Mariana Santos', timestamp: '2024-07-23T11:00:00Z', details: 'Chamado criado.' },
             { type: 'assignment', user: 'Sistema', timestamp: '2024-07-23T11:05:00Z', details: 'Chamado atribuído a Carlos Pereira.' },
             { type: 'comment', user: 'Carlos Pereira', timestamp: '2024-07-23T11:30:00Z', details: 'Senha resetada. Nova senha enviada por canal seguro. Por favor, altere no primeiro login.' },
             { type: 'status_change', user: 'Carlos Pereira', timestamp: '2024-07-23T11:45:00Z', details: 'Status alterado para Resolvido.' }
        ]
    },
    {
        id: 'HD-004',
        title: 'Pedido de férias não aparece como aprovado no sistema',
        requester: 'Maria Oliveira',
        requesterEmail: 'maria.oliveira@empresa.com',
        category: 'RH',
        subcategory: 'Férias',
        priority: 'Média',
        status: 'Aguardando Resposta',
        agent: 'Beatriz Lima',
        createdAt: '2024-07-22T16:00:00Z',
        updatedAt: '2024-07-24T09:20:00Z',
        description: 'Meu pedido de férias para Agosto foi aprovado verbalmente pelo meu gestor, mas ainda consta como pendente no portal do RH.',
        history: [
            { type: 'creation', user: 'Maria Oliveira', timestamp: '2024-07-22T16:00:00Z', details: 'Chamado criado.' },
            { type: 'assignment', user: 'Sistema', timestamp: '2024-07-23T09:00:00Z', details: 'Chamado atribuído a Beatriz Lima.' },
            { type: 'comment', user: 'Beatriz Lima', timestamp: '2024-07-24T09:15:00Z', details: 'Maria, por favor, pode me informar o nome do seu gestor para verificarmos internamente?' },
            { type: 'status_change', user: 'Beatriz Lima', timestamp: '2024-07-24T09:20:00Z', details: 'Status alterado para Aguardando Resposta.' }
        ]
    },
    {
        id: 'HD-005',
        title: 'Ar condicionado da sala de reuniões 3 não está gelando',
        requester: 'Pedro Almeida',
        requesterEmail: 'pedro.almeida@empresa.com',
        category: 'Infraestrutura',
        subcategory: 'Manutenção Predial',
        priority: 'Baixa',
        status: 'Aberto',
        agent: null,
        createdAt: '2024-07-25T11:00:00Z',
        updatedAt: '2024-07-25T11:00:00Z',
        description: 'O ar condicionado da sala 3 parece não estar funcionando corretamente, o ambiente não fica climatizado.',
         history: [
            { type: 'creation', user: 'Pedro Almeida', timestamp: '2024-07-25T11:00:00Z', details: 'Chamado criado.' }
        ]
    }
];

const mockCategories = {
    "TI": ["Hardware", "Software", "Acessos", "Rede", "Impressora", "Telefonia"],
    "RH": ["Benefícios", "Férias", "Folha de Pagamento", "Dúvidas Gerais", "Desligamento"],
    "Financeiro": ["Reembolso", "Pagamentos", "Cobrança", "Orçamento"],
    "Infraestrutura": ["Manutenção Predial", "Limpeza", "Segurança", "Mobiliário"],
    "Comunicação": ["Site", "Intranet", "Material Gráfico"]
};

const mockUsers = {
    "joao.silva@empresa.com": { name: "João Silva", department: "Financeiro", role: "Analista Financeiro" },
    "maria.oliveira@empresa.com": { name: "Maria Oliveira", department: "Marketing", role: "Coordenadora de Marketing" },
    "lucas.andrade@empresa.com": { name: "Lucas Andrade", department: "Vendas", role: "Executivo de Contas" },
    "mariana.santos@empresa.com": { name: "Mariana Santos", department: "Desenvolvimento", role: "Desenvolvedora Frontend" },
    "pedro.almeida@empresa.com": { name: "Pedro Almeida", department: "Operações", role: "Gerente de Operações" },
    "usuario@empresa.com": { name: "Usuário Padrão", department: "TI", role: "Analista de Suporte" }, // Default login user
    "sso.user@empresa.com": { name: "Usuário SSO", department: "RH", role: "Especialista RH" }, // SSO login user
    "ana.costa@empresa.com": { name: "Ana Costa", department: "Financeiro", role: "Analista Financeiro Sr." }, // Agent
    "carlos.pereira@empresa.com": { name: "Carlos Pereira", department: "TI", role: "Suporte Técnico N2" }, // Agent
    "beatriz.lima@empresa.com": { name: "Beatriz Lima", department: "RH", role: "Analista de RH" } // Agent
};

const mockAgents = [
    { id: 1, name: 'Ana Costa' },
    { id: 2, name: 'Carlos Pereira' },
    { id: 3, name: 'Beatriz Lima' },
    { id: 4, name: 'Equipe TI' },
    { id: 5, name: 'Equipe RH' },
];

// Function to get priority icon class
function getPriorityClass(priority) {
    switch (priority?.toLowerCase()) {
        case 'baixa': return 'priority-baixa';
        case 'média': return 'priority-media';
        case 'alta': return 'priority-alta';
        case 'crítica': return 'priority-critica';
        default: return '';
    }
}

function getPriorityIcon(priority) {
     switch (priority?.toLowerCase()) {
        case 'baixa': return 'bi-chevron-down'; // Less severe
        case 'média': return 'bi-dash-lg'; // Medium
        case 'alta': return 'bi-chevron-up'; // More severe
        case 'crítica': return 'bi-exclamation-triangle-fill'; // Critical
        default: return 'bi-question-circle';
    }
}

// Function to get status badge class
function getStatusClass(status) {
    switch (status?.toLowerCase()) {
        case 'aberto': return 'status-aberto';
        case 'em atendimento': return 'status-atendimento';
        case 'aguardando resposta': return 'status-aguardando';
        case 'resolvido': return 'status-resolvido';
        case 'fechado': return 'status-fechado';
        default: return 'status-aguardando';
    }
}

// Function to format dates (basic)
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    } catch (e) {
        return dateString; // Fallback
    }
}

// Function to get dashboard statistics (simulated)
function getDashboardStats() {
    let open = 0;
    let inProgress = 0;
    let resolved = 0;
    let closed = 0;

    mockTickets.forEach(ticket => {
        switch (ticket.status?.toLowerCase()) {
            case 'aberto':
                open++;
                break;
            case 'em atendimento':
            case 'aguardando resposta': // Count 'Aguardando' as 'In Progress' for this summary
                inProgress++;
                break;
            case 'resolvido':
                resolved++;
                break;
            case 'fechado':
                closed++;
                break;
        }
    });

    return { open, inProgress, resolved, closed };
}

// Function to get a ticket by ID (simulates fetching)
function getTicketById(id) {
    // Find the ticket in the mock data
    const ticket = mockTickets.find(ticket => ticket.id === id);
    // Return a deep copy to prevent accidental direct modification of the mock data
    return ticket ? JSON.parse(JSON.stringify(ticket)) : null;
}

// Function to simulate adding a new ticket
function addTicket(ticketData) {
    const newId = `HD-${String(mockTickets.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();
    const newTicket = {
        id: newId,
        title: ticketData.title,
        requester: 'Usuário Logado', // Replace with actual logged user later
        requesterEmail: localStorage.getItem('loggedInUser') || 'usuario@empresa.com',
        category: ticketData.category,
        subcategory: ticketData.subcategory,
        priority: ticketData.priority,
        status: 'Aberto',
        agent: null,
        createdAt: now,
        updatedAt: now,
        description: ticketData.description,
        history: [
            { type: 'creation', user: 'Usuário Logado', timestamp: now, details: 'Chamado criado.' }
        ]
    };
    mockTickets.unshift(newTicket); // Add to the beginning of the array
    console.log("Novo chamado adicionado (simulado):", newTicket);
    return newTicket;
}

// Function to add a history item (comment, status change etc.) to a ticket
function addHistoryItem(ticketId, itemType, user, details) {
    const ticketIndex = mockTickets.findIndex(ticket => ticket.id === ticketId);
    if (ticketIndex === -1) {
        console.error(`Ticket ${ticketId} not found for adding history.`);
        return false;
    }

    const now = new Date().toISOString();
    const newItem = {
        type: itemType, // e.g., 'comment', 'status_change'
        user: user, // User performing the action
        timestamp: now,
        details: details
    };

    // Ensure history array exists
    if (!Array.isArray(mockTickets[ticketIndex].history)) {
        mockTickets[ticketIndex].history = [];
    }

    mockTickets[ticketIndex].history.push(newItem);
    mockTickets[ticketIndex].updatedAt = now; // Update the ticket's last updated time

    console.log(`History item added to ${ticketId}:`, newItem);
    return true;
}

// Function to update ticket status
function updateTicketStatus(ticketId, newStatus, user) {
     const ticketIndex = mockTickets.findIndex(ticket => ticket.id === ticketId);
    if (ticketIndex === -1) {
        console.error(`Ticket ${ticketId} not found for status update.`);
        return false;
    }
    const oldStatus = mockTickets[ticketIndex].status;
    mockTickets[ticketIndex].status = newStatus;
    addHistoryItem(ticketId, 'status_change', user, `Status alterado de "${oldStatus}" para "${newStatus}".`);
    return true;

}

// Function to get timeline icon
function getTimelineIcon(type) {
     switch (type) {
        case 'creation': return 'bi-pencil-fill';
        case 'comment': return 'bi-chat-left-text-fill';
        case 'status_change': return 'bi-tag-fill';
        case 'assignment': return 'bi-person-fill';
        case 'attachment': return 'bi-paperclip';
        default: return 'bi-info-circle-fill';
    }
}

// Function to get timeline icon CSS class
function getTimelineIconClass(type) {
     switch (type) {
        case 'creation': return 'creation';
        case 'comment': return 'comment';
        case 'status_change': return 'status-change';
        case 'assignment': return 'assignment';
        default: return '';
    }
}

export { mockTickets, mockCategories, mockUsers, mockAgents, getTicketById, addTicket, addHistoryItem, updateTicketStatus, getStatusClass, getPriorityClass, getPriorityIcon, formatDate, getTimelineIcon, getTimelineIconClass, getDashboardStats };