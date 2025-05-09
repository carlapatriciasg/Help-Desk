// Validação de senha (letra maiúscula, minúscula, número e comprimento mínimo)
document.getElementById("senha").addEventListener("input", function () {
  validarSenha();
  atualizarRequisitosSenha(); // Adiciona a atualização dos critérios
  validarConfirmacaoSenha();
});

document.getElementById("confirmarSenha").addEventListener("input", validarConfirmacaoSenha);

function validarSenha() {
  const senha = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagem");

  if (senha.length < 8) {
    mensagem.textContent = "A senha deve conter pelo menos 8 caracteres.";
    mensagem.style.color = "red";
    return false;
  } else if (!/[A-Z]/.test(senha)) {
    mensagem.textContent = "A senha deve conter pelo menos uma letra maiúscula.";
    mensagem.style.color = "red";
    return false;
  } else if (!/[a-z]/.test(senha)) {
    mensagem.textContent = "A senha deve conter pelo menos uma letra minúscula.";
    mensagem.style.color = "red";
    return false;
  } else if (!/[0-9]/.test(senha)) {
    mensagem.textContent = "A senha deve conter pelo menos um número.";
    mensagem.style.color = "red";
    return false;
  } else {
    mensagem.textContent = "Senha válida!";
    mensagem.style.color = "green";
    return true;
  }
}

// Função para atualizar os critérios de validação dinamicamente
function atualizarRequisitosSenha() {
  const senha = document.getElementById("senha").value;
  const requisitos = document.getElementById("requisitos");

  const criterios = [
    { regex: /.{8,}/, mensagem: "Pelo menos 8 caracteres" },
    { regex: /[A-Z]/, mensagem: "Pelo menos uma letra maiúscula" },
    { regex: /[a-z]/, mensagem: "Pelo menos uma letra minúscula" },
    { regex: /[0-9]/, mensagem: "Pelo menos um número" },
  ];

  requisitos.innerHTML = ""; // Limpa os critérios anteriores

  criterios.forEach((criterio) => {
    const item = document.createElement("li");
    item.textContent = criterio.mensagem;
    item.style.color = criterio.regex.test(senha) ? "green" : "red";
    requisitos.appendChild(item);
  });
}

function validarConfirmacaoSenha() {
  const senha = document.getElementById("senha").value.trim();
  const confirmarSenha = document.getElementById("confirmarSenha").value.trim();
  const mensagem = document.getElementById("mensagem");

  // Verifica se a senha atende aos critérios antes de comparar
  if (!validarSenha()) {
    mensagem.textContent = "A senha deve atender aos critérios de validação.";
    mensagem.style.color = "red";
    return;
  }

  // Compara as senhas
  if (confirmarSenha === "") {
    mensagem.textContent = "Por favor, confirme sua senha.";
    mensagem.style.color = "red";
  } else if (confirmarSenha !== senha) {
    mensagem.textContent = "As senhas não coincidem.";
    mensagem.style.color = "red";
  } else {
    mensagem.textContent = "As senhas coincidem!";
    mensagem.style.color = "green";
  }
}

// validacao data 
document.querySelector('input[type="date"]').addEventListener('input', function () {
  const data = this.value;

  // Verifica se o formato da data está correto (YYYY-MM-DD)
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(data)) {
    this.value = ''; // Limpa o campo se o formato estiver incorreto
    alert('Data inválida! Certifique-se de usar o formato correto: DD/MM/AAAA.');
    return;
  }

  // Extrai o ano da data
  const ano = data.split('-')[0];

  // Verifica se o ano tem exatamente 4 dígitos
  if (ano.length !== 4) {
    this.value = ''; // Limpa o campo se o ano não tiver 4 dígitos
    alert('O ano deve conter exatamente 4 dígitos.');
  }
});
