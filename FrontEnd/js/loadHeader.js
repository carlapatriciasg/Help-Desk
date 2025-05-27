export async function loadHeader(titulo) {
    const response = await fetch('/FrontEnd/pages/header.html');
    const html = await response.text();
    // Insere o header no início do .main-content-wrapper ou onde preferir
    const wrapper = document.querySelector('.main-content-wrapper');
    if (wrapper) {
        wrapper.insertAdjacentHTML('afterbegin', html);
        // Atualiza traduções após inserir o header dinâmico
        if (window.updateContent) updateContent();
    }
    document.getElementById('header-title').innerHTML = `<strong>${titulo}</strong>`;
    document.body.style.visibility = 'visible';
}