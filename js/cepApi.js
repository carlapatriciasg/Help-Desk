class CepConsulta {
    static limpaFormulario() {
        document.getElementById('rua').value = "";
        document.getElementById('bairro').value = "";
        document.getElementById('cidade').value = "";
        document.getElementById('uf').value = "";
    }

    static preencherFormulario(dados) {
        document.getElementById('rua').value = dados.logradouro || "";
        document.getElementById('bairro').value = dados.bairro || "";
        document.getElementById('cidade').value = dados.localidade || "";
        document.getElementById('uf').value = dados.uf || "";
    }

    static async pesquisar(cepDigitado) {
        const cep = cepDigitado.replace(/\D/g, '');

        if (cep !== "") {
            const validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {
                // Preenche "..." enquanto busca
                document.getElementById('rua').value = "...";
                document.getElementById('bairro').value = "...";
                document.getElementById('cidade').value = "...";
                document.getElementById('uf').value = "...";

                try {
                    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    const dados = await resposta.json();

                    if ("erro" in dados) {
                        CepConsulta.limpaFormulario();
                        alert("CEP não encontrado.");
                    } else {
                        CepConsulta.preencherFormulario(dados);
                    }
                } catch (erro) {
                    CepConsulta.limpaFormulario();
                    alert("Erro ao consultar o CEP.");
                    console.error("Erro na requisição:", erro);
                }
            } else {
                CepConsulta.limpaFormulario();
                alert("Formato de CEP inválido.");
            }
        } else {
            CepConsulta.limpaFormulario();
        }
    }
}

// Função global para ser usada no HTML
function pesquisacep(valor) {
    CepConsulta.pesquisar(valor);
}
