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
    validateEmail(messages);
    validatePassword(password, messages);
    validatePassword(repeatPassword, messages);
    comparePasswords(password, repeatPassword, messages)
    checkFormValidity();
}

/**
 * Validates the 'email' field in the signup form. Checks if the field is empty, null or if
 * its value does not match the email regex pattern. If the field is invalid, adds an error
 * message to the 'messages' array and adds the 'error-highlight' class to the field's parent
 * node for styling. If the field is valid, removes the error message and the 'error-highlight'
 * class from the field's parent node.
 * @param {Array<string>} messages - array to store validation error messages
 * @returns {undefined}
 */
function validateEmail(messages) {
    let email = document.getElementById('email');
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    limitMaxChars(email);
    if (email.value === '' || email.value == null || email.value.length >= 56 || !emailRegex.test(email.value)) {
        if (!messages.includes('Please enter a valid Email')) {
            messages.push('Please enter a valid Email');
        }
        showErrorEmailLength (messages, email);
        email.parentNode.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(email, messages, 'Please enter a valid Email');
    } 
}

/**
 * Checks if the email length exceeds the maximum allowed length.
 * If the email value is 56 characters or more, adds an error message 
 * to the 'messages' array indicating the email length constraint.
 * 
 * @param {Array<string>} messages - array to store validation error messages
 * @param {HTMLInputElement} email - email input field to check length
 * @returns {undefined}
 */

function showErrorEmailLength (messages, email) {
    if (email.value.length >= 56 ) {
        messages.push('Email length cannot be more than 55 characters');
    }
}

/**
 * Limits the maximum number of characters in an input field to a specified value.
 * @param {HTMLInputElement} element - input element to limit character count
 * @returns {undefined}
 */
function limitMaxChars(element) {
    let max_chars = 56;
    if(element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}

/**
 * Validates the password field in the signup form by checking if it is empty or null.
 * If the field is invalid, an error message is added to the messages array and the
 * 'error-highlight' class is added to the field's parent node for styling. If the field
 * is valid, removes the error message and the 'error-highlight' class from the field's
 * parent node. Also calls validatePassworAsPassword to check if the password value is 
 * not 'password'.
 * @param {HTMLInputElement} inputElementPW - password input element
 * @param {Array<string>} messages - array to store validation error messages
 * @returns {undefined}
 */
function validatePassword(inputElementPW, messages) {
    if (inputElementPW.value === '' || inputElementPW.value == null) {
        if (!messages.includes('Please enter a password')) {
            messages.push('Please enter a password');
        }
        inputElementPW.parentNode.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(inputElementPW, messages, 'Please enter a password');
    }
    validatePassworAsPassword(inputElementPW, messages);
}

/**
 * Validates the password field in the signup form by checking if its value is 'password'.
 * If the field is invalid, an error message is added to the messages array and the
 * 'error-highlight' class is added to the field's parent node for styling. If the field
 * is valid, removes the error message and the 'error-highlight' class from the field's
 * parent node.
 * @param {HTMLInputElement} inputElementPW - password input element
 * @param {Array<string>} messages - array to store validation error messages
 * @returns {undefined}
 */
function validatePassworAsPassword(inputElementPW, messages) {
    if (inputElementPW.value === 'password') {
        if (!messages.includes('Password cannot be password')) {
            messages.push('Password cannot be password');
        }
        inputElementPW.parentNode.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(inputElementPW, messages, 'Password cannot be password');
    }
}

/**
 * Checks the validity of the signup form by verifying if the name, email, password,
 * repeat password fields are filled correctly, and if the privacy policy checkbox is 
 * checked. If all conditions are met, enables the submit button; otherwise, disables it.
 * @function checkFormValidity
 * @returns {undefined}
 */
function checkFormValidity() {
    const submitBtn = document.getElementById('submitBtn');
    const chbPrivPol = document.getElementById('chbPrivPol');
    if (messages.length > 0 || !chbPrivPol.checked) { 
        submitBtn.disabled = true;
    } else {
        submitBtn.disabled = false;
    }
}