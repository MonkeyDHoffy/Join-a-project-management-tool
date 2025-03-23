let isValid = true;

/**
 * Validiert das Kontaktformular durch Überprüfung aller Eingabefelder.
 * Diese Funktion koordiniert den Validierungsprozess.
 * @returns {boolean} True wenn alle Felder gültig sind, sonst false
 */
function validateForm() {
    let createBtn = document.getElementById("save-btn-overlay");
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    resetValidation([name, email, phone]);
    checkFormFields(name, email, phone);
    if (isValid == false) {
        createBtn.disabled = true;
    } else {
        createBtn.disabled = false;
    }
}

/**
 * Checks the individual form fields for validity and shows error messages.
 * @param {HTMLInputElement} nameInput - The name input field
 * @param {HTMLInputElement} emailInput - The email input field
 * @param {HTMLInputElement} phoneInput - The phone input field
 */
function checkFormFields(nameInput, emailInput, phoneInput) {
    isValid = true;
    if (!validateName(nameInput.value)) {
        showError(nameInput, "Please enter a valid name");
        isValid = false;
    }
    if (!validateEmail(emailInput.value)) {
        showErrorOne(emailInput, "Please enter a valid email");
        isValid = false;
    }
    if (!validatePhone(phoneInput.value)) {
        showErrorTwo(phoneInput, "Please enter a valid phone number");
        isValid = false;
    }
}

/**
 * Validates the name input field.
 * @param {string} name - The name value to validate.
 * @returns {boolean} True if the name is valid, false otherwise.
 */
function validateName(name) {
    return name.trim().length >= 2 && /^[\p{L}\s\-]+$/u.test(name);
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

function showErrorOne(input, message) {
    input.classList.add('invalid');
    let errorDiv = document.createElement('div');
    errorDiv.className = 'error-message-one';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

function showErrorTwo(input, message) {
    input.classList.add('invalid');
    let errorDiv = document.createElement('div');
    errorDiv.className = 'error-message-two';
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
        
        // Entferne alle Fehlermeldungen, unabhängig von ihrer Klasse
        let errorMessages = input.parentNode.querySelectorAll('.error-message, .error-message-one, .error-message-two');
        errorMessages.forEach(error => error.remove());
    });
}
