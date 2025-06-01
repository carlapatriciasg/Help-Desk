export function setupDropdownStatus(buttonId = 'dropdownStatusButton', itemSelector = '.dropdown-item-detail') {
    const dropdownButton = document.getElementById(buttonId);
    const dropdownItems = document.querySelectorAll(itemSelector);

    if (!dropdownButton) return;

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            const selectedText = this.textContent.trim();
            const iconElement = this.querySelector('i');
            const iconClass = iconElement ? iconElement.className : 'bi bi-arrow-down-up';

            dropdownButton.innerHTML = `<i class="${iconClass} me-2"></i>${selectedText}`;
        });
    });
}