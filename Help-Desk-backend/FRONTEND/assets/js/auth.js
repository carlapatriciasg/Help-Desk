import { mockUsers } from './data.js';

const LOGGED_IN_USER_KEY = 'loggedInUser';

/**
 * Checks if the user is logged in for protected pages and redirects if not.
 */
export function checkLoginStatus() {
    const protectedPages = ['dashboard.html', 'new-ticket.html', 'ticket-list.html', 'ticket-detail.html', 'profile.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage) && !isLoggedIn()) {
        console.warn('User not logged in. Redirecting to login page.');
        window.location.href = 'login.html';
        return false; // Indicate redirect happened or is needed
    }
    return true; // User is logged in or page is not protected
}

/**
 * Checks if a user is currently logged in based on localStorage.
 * @returns {boolean} True if logged in, false otherwise.
 */
export function isLoggedIn() {
    return !!localStorage.getItem(LOGGED_IN_USER_KEY);
}

/**
 * Gets the email of the currently logged-in user.
 * @returns {string | null} The user's email or null if not logged in.
 */
export function getLoggedInUserEmail() {
    return localStorage.getItem(LOGGED_IN_USER_KEY);
}

/**
 * Gets the full user object for the currently logged-in user.
 * @returns {object | null} The user object from mockUsers or null.
 */
export function getLoggedInUser() {
    const email = getLoggedInUserEmail();
    if (!email) return null;
    return mockUsers[email] || { name: email.split('@')[0], email: email }; // Fallback user object
}

/**
 * Logs the user out by removing the stored user info and redirecting to login.
 */
export function logout() {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
    window.location.href = 'login.html';
}

/**
 * Sets up logout functionality for buttons with specific IDs.
 */
export function setupLogoutButtons() {
    const logoutButtons = document.querySelectorAll('#logout-button, #logout-button-sidebar');
    logoutButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    });
}