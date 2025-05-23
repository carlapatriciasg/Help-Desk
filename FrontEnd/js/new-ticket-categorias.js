document.addEventListener('DOMContentLoaded', function() {
    const categorias = {
        "TI": ["Acesso ao Sistema", "Erro de Software", "Instalação de Programa", "Problema de Impressora", "Rede/Internet"],
        "RH": ["Solicitação de Férias", "Alteração de Dados", "Benefícios", "Folha de Pagamento"],
        "Financeiro": ["Reembolso", "Nota Fiscal", "Cobrança", "Solicitação de Pagamento"],
        "Facilities": ["Manutenção Predial", "Limpeza", "Ar Condicionado", "Mudança de Layout"],
        "Suporte ao Cliente": ["Dúvida sobre Produto", "Reclamação", "Elogio", "Solicitação de Informação"]
    };

    const categorySelect = document.getElementById('category');
    const subcategorySelect = document.getElementById('subcategory');

    // Preenche as categorias
    Object.keys(categorias).forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });

    // Ao mudar a categoria, preenche as subcategorias
    categorySelect.addEventListener('change', function() {
        subcategorySelect.innerHTML = '<option value="" disabled selected>Selecione a subcategoria</option>';
        subcategorySelect.disabled = false;
        categorias[this.value].forEach(sub => {
            const option = document.createElement('option');
            option.value = sub;
            option.textContent = sub;
            subcategorySelect.appendChild(option);
        });
    });
});