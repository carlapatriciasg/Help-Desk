
// Validação de senha (letra maiúscula e minúscula)
document.getElementById("senha").addEventListener("input", function () {
  validarSenha();
  validarConfirmacaoSenha();
});

// Validação de confirmação de senha
document.getElementById("confirmarSenha").addEventListener("input", function () {
  validarConfirmacaoSenha();
});

function validarSenha() {
  const senha = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagem");

  if (!/[A-Z]/.test(senha)) {
    mensagem.textContent = "A senha deve conter pelo menos uma letra maiúscula.";
    mensagem.style.color = "red";
    return false;
  } else if (!/[a-z]/.test(senha)) {
    mensagem.textContent = "A senha deve conter pelo menos uma letra minúscula.";
    mensagem.style.color = "red";
    return false;
  } else {
    mensagem.textContent = "Senha válida!";
    mensagem.style.color = "green";
    return true;
  }
}

function validarConfirmacaoSenha() {
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const mensagem = document.getElementById("mensagem");

  if (!validarSenha()) {
    mensagem.textContent = "A senha deve conter pelo menos uma letra maiúscula e minúscula.";
    mensagem.style.color = "red";
    return;
  }

  if (confirmarSenha !== senha) {
    mensagem.textContent = "As senhas não coincidem.";
    mensagem.style.color = "red";
  } else if (senha && confirmarSenha) {
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
