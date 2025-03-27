/**
 * Listens for input events on the signup form and validates its fields.
 * Whenever the fields are invalid, prevents the form from submitting and
 * displays the validation errors in the '.error' element.
 * @function validateForm
 * @returns {undefined}
 */
function validateForm() {
    let errorElement = document.getElementById('error');
    let form = document.getElementById('signupForm');

    form.addEventListener('input', (e) => {

        messages.length = 0;
        errorElement.innerHTML = '';
        let password = document.getElementById('password');
        let repeatPassword = document.getElementById('repeatPassword');

        callValidationFunctions(messages, password, repeatPassword)
        preventDefaultFormSubmit(e, messages, errorElement);
    })
}


/**
 * Calls all the validation functions for the signup form.
 * @function callValidationFunctions
 * @param {Array<string>} messages - array to store validation error messages
 * @param {HTMLInputElement} password - password input element
 * @param {HTMLInputElement} repeatPassword - repeat password input element
 * @returns {undefined}
 */
function callValidationFunctions(messages, password, repeatPassword) {
    validateName(messages);
   // showErrorNameNotNumber (messages)
    validateEmail(messages);
    validatePassword(password, messages);
    validatePassword(repeatPassword, messages);
    comparePasswords(password, repeatPassword, messages)
    checkFormValidity();
}
