export function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'aberto':
            return 'status-aberto';
        case 'em atendimento':
            return 'status-atendimento';
        case 'aguardando':
            return 'status-aguardando';
        case 'resolvido':
            return 'status-resolvido';
        case 'fechado':
            return 'status-fechado';
        default:
            return 'bg-secondary text-white';
    }
}