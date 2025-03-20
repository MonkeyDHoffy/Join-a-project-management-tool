/**
 * Validiert das Kontaktformular durch Überprüfung aller Eingabefelder.
 * Diese Funktion koordiniert den Validierungsprozess.
 * @returns {boolean} True wenn alle Felder gültig sind, sonst false
 */
function validateForm() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    resetValidation([name, email, phone]);
    return checkFormFields(name, email, phone);
}

/**
 * Prüft die einzelnen Formularfelder auf Gültigkeit und zeigt Fehlermeldungen an.
 * Diese Funktion kümmert sich um die eigentliche Validierungslogik.
 * @param {HTMLElement} name - Das Name-Eingabefeld
 * @param {HTMLElement} email - Das Email-Eingabefeld
 * @param {HTMLElement} phone - Das Telefon-Eingabefeld
 * @returns {boolean} True wenn alle Felder gültig sind, sonst false
 */
function checkFormFields(name, email, phone) {
    let isValid = true;
    if (!validateName(name.value)) {
        showError(name, "Please enter a valid name");
        isValid = false;
    }
    if (!validateEmail(email.value)) {
        showError(email, "Please enter a valid email");
        isValid = false;
    }
    if (!validatePhone(phone.value)) {
        showError(phone, "Please enter a valid phone number");
        isValid = false;
    }
    return isValid;
}

/**
 * Validates the name input field.
 * @param {string} name - The name value to validate.
 * @returns {boolean} True if the name is valid, false otherwise.
 */
function validateName(name) {
    return name.trim().length >= 2 && /^[a-zA-Z\s\-]+$/.test(name);
}

/**
 * Validates the email input field.
 * @param {string} email - The email value to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates the phone input field.
 * @param {string} phone - The phone value to validate.
 * @returns {boolean} True if the phone number is valid, false otherwise.
 */
function validatePhone(phone) {
    return /^[\d\s\-\+\(\)]{6,}$/.test(phone);
}

/**
 * Displays an error message for an invalid input field.
 * @param {HTMLElement} input - The input element to show the error for.
 * @param {string} message - The error message to display.
 */
function showError(input, message) {
    input.classList.add('invalid');
    let errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

/**
 * Resets the validation state of input fields by removing error messages and invalid classes.
 * @param {HTMLElement[]} inputs - An array of input elements to reset validation for.
 */
function resetValidation(inputs) {
    inputs.forEach(input => {
        input.classList.remove('invalid');
        let existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    });
}
