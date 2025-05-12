import { mockCategories, addTicket } from '../data.js';
import { displaySuccess } from '../ui.js';

/**
 * Initializes the New Ticket form, populating categories and handling submission.
 */
export function initNewTicketForm() {
    console.log("Initializing New Ticket Form...");
    const categorySelect = document.getElementById('category');
    const subcategorySelect = document.getElementById('subcategory');
    const form = document.getElementById('new-ticket-form');

    populateCategories(categorySelect, subcategorySelect);
    setupFormSubmission(form, categorySelect, subcategorySelect);
}

/**
 * Populates the category dropdown and sets up the change listener for subcategories.
 * @param {HTMLSelectElement} categorySelect The category select element.
 * @param {HTMLSelectElement} subcategorySelect The subcategory select element.
 */
function populateCategories(categorySelect, subcategorySelect) {
    if (!categorySelect) return;

    // Clear existing options except placeholder
    const placeholder = categorySelect.querySelector('option[disabled]');
    categorySelect.innerHTML = '';
    if (placeholder) categorySelect.appendChild(placeholder);

    Object.keys(mockCategories).sort().forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Add event listener to update subcategories on category change
    categorySelect.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        updateSubcategories(selectedCategory, subcategorySelect);
    });

    // Initial population if a category is pre-selected (e.g., on error recovery)
    if (categorySelect.value) {
        updateSubcategories(categorySelect.value, subcategorySelect);
    } else {
         updateSubcategories('', subcategorySelect); // Ensure subcategory is disabled initially
    }
}

/**
 * Updates the subcategory dropdown based on the selected category.
 * @param {string} category The selected category.
 * @param {HTMLSelectElement} subcategorySelect The subcategory select element.
 */
function updateSubcategories(category, subcategorySelect) {
    if (!subcategorySelect) return;

    // Clear existing options (except placeholder)
    const placeholder = subcategorySelect.querySelector('option[disabled]');
    subcategorySelect.innerHTML = '';
     if (placeholder) subcategorySelect.appendChild(placeholder);
    subcategorySelect.disabled = true; // Disable initially or if no category selected

    if (category && mockCategories[category]) {
        mockCategories[category].sort().forEach(sub => {
            const option = document.createElement('option');
            option.value = sub;
            option.textContent = sub;
            subcategorySelect.appendChild(option);
        });
        subcategorySelect.disabled = false; // Enable if category has subcategories
    }
}

/**
 * Sets up the form submission handler.
 * @param {HTMLFormElement} form The form element.
 * @param {HTMLSelectElement} categorySelect The category select element.
 * @param {HTMLSelectElement} subcategorySelect The subcategory select element.
 */
function setupFormSubmission(form, categorySelect, subcategorySelect) {
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true; // Prevent double submission
        submitButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...`;

        // Basic validation example
        const titleInput = document.getElementById('title');
        const descriptionInput = document.getElementById('description');
        if (!categorySelect.value || !subcategorySelect.value || !titleInput.value || !descriptionInput.value) {
            alert('Por favor, preencha todos os campos obrigatórios (*).');
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="bi bi-send-fill me-2"></i>Enviar Chamado';
            return;
        }

        const formData = {
            category: categorySelect.value,
            subcategory: subcategorySelect.value,
            priority: document.getElementById('priority').value,
            title: titleInput.value,
            description: descriptionInput.value,
            // Add attachment handling later if implemented
        };

        try {
            const newTicket = addTicket(formData); // Simulate adding the ticket
            displaySuccess(`Chamado ${newTicket.id} criado com sucesso!`);
            window.location.href = `ticket-detail.html?id=${newTicket.id}`; // Redirect to detail page
        } catch (error) {
             console.error("Error creating ticket:", error);
             alert("Ocorreu um erro ao criar o chamado. Tente novamente.");
             submitButton.disabled = false;
             submitButton.innerHTML = '<i class="bi bi-send-fill me-2"></i>Enviar Chamado';
        }
    });
}