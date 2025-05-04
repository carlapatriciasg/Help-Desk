
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

