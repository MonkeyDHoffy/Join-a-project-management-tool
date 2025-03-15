
let messages = [];


/**
 * Initializes the signup page by calling the necessary functions to
 * render the signup form, render the privacy policy, validate the form,
 * focus on the password input, check the form's validity and get all
 * users.
 */
function SignUpInit() {
     renderPrivPol();
    renderSignupForm();
    validateForm();
    passwordFocus();
    checkFormValidity();
    getUsers();
};



/**
 * Shows the success message after a user signs up and checks the
 * privacy policy checkbox and removes it after 2 seconds. If the
 * privacy policy checkbox is not checked, an error message is
 * displayed.
 */
function showSignUpMsg() {
    const signUpMsg = document.getElementById('signUpMsg');
    const backdrop = document.getElementById('backdrop');
    const chbPrivPol = document.getElementById('chbPrivPol');

    toggleErrorPrivPol();

    if (chbPrivPol.checked === true) {
        signUpMsg.classList.remove('d-none');
        backdrop.classList.remove('d-none');

        setTimeout(() => {
            window.location.href = "./index.html";
        }, 2000);
    }
}


/**
 * Toggles the error message when the privacy policy checkbox is
 * checked or unchecked.
 *
 * If the checkbox is not checked, an error message is displayed.
 * If the checkbox is checked, the error message is removed.
 * 
 */
function toggleErrorPrivPol() {
    const errorPrivPol = document.getElementById('errorPrivPol');
    const chbPrivPol = document.getElementById('chbPrivPol');

    if (chbPrivPol.checked === false) {
        errorPrivPol.innerHTML = 'Please accept the privacy policy';
        errorPrivPol.classList.remove('d-none');
    } else {
        errorPrivPol.innerHTML = '';
        errorPrivPol.classList.add('d-none');
    }
}


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
    //let messages = [];

    form.addEventListener('input', (e) => {

        messages.length = 0;
        errorElement.innerHTML = '';
        //messages = [];
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
 * Prevents the signup form from submitting if there are any validation
 * errors. If there are errors, displays them in the '.error' element.
 * @function preventDefaultFormSubmit
 * @param {Event} e - event object
 * @param {Array<string>} messages - array of validation error messages
 * @param {HTMLElement} errorElement - element where the error messages will be displayed
 * @returns {undefined}
 */
function preventDefaultFormSubmit(e, messages, errorElement) {
    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerHTML = messages.join(', ')
    } else {
        errorElement.innerHTML = '';
    }
}


/**
 * Compares the password and repeat password fields and checks if they are equal.
 * If they are not equal or if either one is empty, an error message is added to the
 * 'messages' array and the fields are highlighted in red. If the fields are equal and
 * not empty, the error message is removed and the fields are not highlighted.
 * @param {HTMLInputElement} password - password input element
 * @param {HTMLInputElement} repeatPassword - repeat password input element
 * @param {Array<string>} messages - array of validation error messages
 * @returns {undefined}
 */
function comparePasswords(password, repeatPassword, messages) {
    if (password.value !== repeatPassword.value || password.value === '' || repeatPassword.value === '') {
        if (!messages.includes('Passwords do not match')) {
            messages.push('Passwords do not match');
        }
        password.parentNode.classList.add('error-highlight');
        repeatPassword.parentNode.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(password, messages, 'Passwords do not match');
        removeErrorMessageAndHighlight(repeatPassword, messages, 'Passwords do not match');
    }
}


/**
 * Removes a specific error message from the 'messages' array and removes the
 * 'error-highlight' class from the parent node of the input element.
 * @function removeErrorMessageAndHighlight
 * @param {HTMLInputElement} inputElement - input element to remove error 
 *                                          message from
 * @param {Array<string>} messages - array of error messages to remove from
 * @param {string} errorMessage - error message to remove
 * @returns {undefined}
 */
function removeErrorMessageAndHighlight(inputElement, messages, errorMessage) {
    let index = messages.indexOf(errorMessage);
    if (index > -1) {
        messages.splice(index, 1);
    }
    inputElement.parentNode.classList.remove('error-highlight');
}


/**
 * Validates the 'name' field in the signup form. Checks if the field is empty or null.
 * If the field is invalid, adds an error message to the 'messages' array and adds the 
 * 'error-highlight' class to the field's parent node for styling. If the field is valid, 
 * removes the error message and the 'error-highlight' class from the field's parent node.
 * @param {Array<string>} messages - array to store validation error messages
 * @returns {undefined}
 */
function validateName(messages) {
    let signupName = document.getElementById('signupName');
    if (signupName.value === '' || signupName.value == null) {
        messages.push('Please enter your name')
        signupName.parentNode.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(signupName, messages, 'Please enter your name')
    }
}


/**
 * Validates the 'email' field in the signup form. Checks if the field is empty, null or 
 * if its value does not include '@'. If the field is invalid, adds an error message to the
 * 'messages' array and adds the 'error-highlight' class to the field's parent node for
 * styling. If the field is valid, removes the error message and the 'error-highlight' class
 * from the field's parent node.
 * @function validateEmail
 * @param {Array<string>} messages - array to store validation error messages
 * @returns {undefined}
 */
function validateEmail(messages) {
    let email = document.getElementById('email');
    if (email.value === '' || email.value == null || email.value.includes('@') === false) {
        messages.push('Please enter a valid Email')
        email.parentNode.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(email, messages, 'Please enter a valid Email')
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
 * Initializes the password and repeat password input fields and their toggle buttons
 * on the signup form. Sets up event listeners to update the icons and enable/disable
 * the toggle buttons based on the input fields' values.
 * @function passwordFocus
 * @returns {undefined}
 */
function passwordFocus() {
    setupPasswordField('password', '.pw-wrapper button img', '.pw-wrapper button');
    setupPasswordField('repeatPassword', '.rep-pw-wrapper button img', '.rep-pw-wrapper button');
}


/**
 * Sets up the password input field and its toggle button. The lock
 * icon will be replaced with an eye icon when the password input field is not empty and
 * the eye icon will be replaced with the lock icon when the password input field is empty.
 * The toggle button is enabled when the password input field is not empty and disabled
 * when the password input field is empty.
 * @function setupPasswordField
 * @param {string} passwordInputId - id of the password input field
 * @param {string} iconSelector - CSS selector for the lock icon
 * @param {string} buttonSelector - CSS selector for the toggle button
 * @returns {undefined}
 */
function setupPasswordField(passwordInputId, iconSelector, buttonSelector) {
    let passwordInput = document.getElementById(passwordInputId);
    let iconPW = document.querySelector(iconSelector);
    let iconPWButton = document.querySelector(buttonSelector);

    reAppearLockIcon(passwordInput, iconPW, iconPWButton);
}


/**
 * Listens for input events on the password input field and updates the lock icon 
 * accordingly. When the password input field is empty, the lock icon is displayed 
 * and the toggle button is disabled. When the password input field is not empty, 
 * the eye icon is displayed and the toggle button is enabled.
 * @function reAppearLockIcon
 * @param {HTMLInputElement} passwordInput - password input field
 * @param {HTMLImageElement} iconPW - lock icon image element
 * @param {HTMLButtonElement} iconPWButton - toggle button
 * @returns {undefined}
 */
function reAppearLockIcon(passwordInput, iconPW, iconPWButton) {
    passwordInput.addEventListener('input', () => {
        if (passwordInput.value === '') {
            iconPW.src = '../assets/svg/lock.svg';
            iconPW.classList.remove('cursor-pointer');
            iconPWButton.disabled = true;
        } else {
            iconPW.src = '../assets/svg/eye.svg';
            iconPW.classList.add('cursor-pointer');
            iconPWButton.disabled = false;
        }
    });
}


/**
 * Toggles the visibility of the password in the signup form. When the password is 
 * hidden, it changes the input type to 'text' to show the password and updates 
 * the icon to an eye with a slash. When the password is visible, it changes the 
 * input type back to 'password' and updates the icon to a plain eye. Adds the 
 * 'cursor-pointer' class to the icon for styling.
 * @function togglePasswordVisibility
 * @param {HTMLButtonElement} button - toggle button
 * @returns {undefined}
 */
function togglePasswordVisibility(button) {
    let passwordInput = button.previousElementSibling;
    let pwIcon = button.querySelector('img');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        pwIcon.src = '../assets/svg/eye_slash.svg';
        pwIcon.classList.add('cursor-pointer');
    } else {
        passwordInput.type = 'password';
        pwIcon.src = '../assets/svg/eye.svg';
        pwIcon.classList.add('cursor-pointer');
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
    const signupName = document.getElementById('signupName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeatPassword');
    const chbPrivPol = document.getElementById('chbPrivPol');
    const submitBtn = document.getElementById('submitBtn');
    setFormValidityConditons(signupName, email, password, repeatPassword, chbPrivPol, submitBtn);
}


/**
 * Checks the validity of the signup form by verifying if the name, email, password,
 * repeat password fields are filled correctly, and if the privacy policy checkbox is
 * checked. If all conditions are met, enables the submit button; otherwise, disables it.
 * @function setFormValidityConditons
 * @param {HTMLInputElement} signupName - signup name field
 * @param {HTMLInputElement} email - email field
 * @param {HTMLInputElement} password - password field
 * @param {HTMLInputElement} repeatPassword - repeat password field
 * @param {HTMLInputElement} chbPrivPol - privacy policy checkbox
 * @param {HTMLButtonElement} submitBtn - submit button
 * @returns {undefined}
 */
function setFormValidityConditons(signupName, email, password, repeatPassword, chbPrivPol, submitBtn) {
    const signupNameIsValid = signupName.value !== '';
    const emailIsValid = email.value !== '' && email.value.includes('@');
    const passwordIsValid = password.value !== '' && password.value !== 'password';
    const repeatPasswordIsValid = repeatPassword.value !== '' && repeatPassword.value !== 'password';
    const privPolIsChecked = chbPrivPol.checked;
    if (signupNameIsValid && emailIsValid && passwordIsValid && repeatPasswordIsValid && privPolIsChecked) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}


/**
 * Registers a new user by creating a new user object with the values from the signup form,
 * adds the user to the users array and saves the users array to local storage. If the user
 * already exists, adds an error message to the messages array.
 * @function registerUser
 * @returns {Promise<void>}
 */
async function registerUser() {
    let user = {
        'name': document.getElementById('signupName').value,
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value
    };
    if (users.find(user => user.email === document.getElementById('email').value)) {
        messages.push('User already exists');
    } else {
        users.push(user);
        await putData("users", users);
        showSignUpMsg();
    }
}
