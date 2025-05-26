export function loadHeader(title) {
    return fetch('/FrontEnd/pages/header.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const header = tempDiv.querySelector('header');
            document.querySelector('.main-content-wrapper').prepend(header);
            document.getElementById('header-title').innerHTML = `<strong>${title}</strong>`;
            document.body.style.visibility = 'visible';
        });
}