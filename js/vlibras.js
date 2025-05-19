// Adiciona o HTML necessário para o VLibras
const vlibrasDiv = document.createElement('div');
vlibrasDiv.setAttribute('vw', '');
vlibrasDiv.className = 'enabled';
vlibrasDiv.innerHTML = `
  <div vw-access-button class="active"></div>
  <div vw-plugin-wrapper>
    <div class="vw-plugin-top-wrapper"></div>
  </div>
`;
document.body.prepend(vlibrasDiv);

// Carrega o script do VLibras
const script = document.createElement('script');
script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
script.onload = () => {
  new window.VLibras.Widget('https://vlibras.gov.br/app');
};
document.body.appendChild(script);