let messages = [];

/**
 * Initializes all login functionality
 * @function loginInit
 * @returns {undefined}
 */
function loginInit() {
    renderLoginForm();
    validateForm();
    passwordFocus();
    getUsers();
    handleAnimationBackdrop();
    animateLogo();
    renderPrivPol();
};

/**
 * Handles the animation end event for the backdrop element.
 * Adds the 'd-none' class to hide the element and then removes it from the DOM.
 */
function handleAnimationBackdrop() {
    const backdrop = document.getElementById('backdrop');
    backdrop.addEventListener('animationend', () => {
        backdrop.classList.add('d-none');
        backdrop.remove();
    });
}

/**
 * Adds the 'animate' class to the '.p1-logo' element and
 * ensures that the animation only runs once. The animation
 * is defined in the css file.
 * @function animateLogo
 * @returns {undefined}
 */
function animateLogo() {
    let animationRun = false;
    if (!animationRun) {
        document.querySelector(".p1-logo").classList.add("animate");
        animationRun = true;
    }
}

/**
 * Listens for input events on the login form and validates its fields.
 * Whenever the fields are invalid, prevents the form from submitting and
 * displays the validation errors in the '.error' element.
 * @function validateForm
 * @returns {undefined}
 */
function validateForm() {
    let errorElement = document.getElementById('error');
    let form = document.getElementById('loginForm');
    form.addEventListener('input', (e) => {
        messages.length = 0;
        errorElement.innerHTML = '';
        
        validateEmail(messages);
        validatePassword(messages);
        checkLoginFormValidity();

        if (messages.length > 0) {
            e.preventDefault()
            errorElement.innerHTML = messages.join(', ')
        }
    })
}

/**
 * Validates the 'email' field in the login form. Checks if the field is empty, 
 * null or if its value does not match the email regex pattern. If the field is 
 * invalid, adds an error message to the 'messages' array and adds the 
 * 'error-highlight' class to the field's parent node for styling. If the field is 
 * valid, removes the error message and the 'error-highlight' class from the field's 
 * parent node.
 * @function validateEmail
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
 * Validates the 'password' field in the login form. Checks if the field is empty, null or if
 * its value is equal to 'password'. If the field is invalid, adds an error message to the
 * 'messages' array and adds the 'error-highlight' class to the field's parent node for
 * styling. If the field is valid, removes the error message and the 'error-highlight' class
 * from the field's parent node.
 * @param {Array<string>} messages - array to store validation error messages
 * @returns {undefined}
 */
function validatePassword(messages) {
    let password = document.getElementById('password');
    validatePasswordEmpty(password, messages);
    validatePasswordNotPassword(password, messages);
}

/**
 * Checks if the password field is empty or null. If the field is invalid, adds an error
 * message to the 'messages' array and adds the 'error-highlight' class to the field's
 * parent node for styling. If the field is valid, removes the error message and the
 * 'error-highlight' class from the field's parent node.
 * @param {HTMLInputElement} password - password input field
 * @param {Array<string>} messages - array to store validation error messages
 * @returns {undefined}
 */
function validatePasswordEmpty(password, messages) {
    if (password.value === '' || password.value == null) {
        if (!messages.includes('Please enter a password')) {
            messages.push('Please enter a password');
        }
        password.parentNode.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(password, messages, 'Please enter a password');
    }
}

/**
 * Checks if the password field value is equal to 'password'. If the field is invalid, adds
 * an error message to the 'messages' array and adds the 'error-highlight' class to the
 * field's parent node for styling. If the field is valid, removes the error message and the
 * 'error-highlight' class from the field's parent node.
 * @param {HTMLInputElement} password - password input field
 * @param {Array<string>} messages - array to store validation error messages
 * @returns {undefined}
 */
function validatePasswordNotPassword(password, messages) {
    if (password.value === 'password') {
        if (!messages.includes('Password cannot be password')) {
            messages.push('Password cannot be password');
        }
        password.parentNode.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(password, messages, 'Password cannot be password');
    }
}

/**
 * Initializes the password input field and its toggle button in the login form. The lock
 * icon will be replaced with an eye icon when the password input field is not empty and
 * the eye icon will be replaced with the lock icon when the password input field is empty.
 * The toggle button is enabled when the password input field is not empty and disabled
 * when the password input field is empty.
 * @function passwordFocus
 * @returns {undefined}
 */
function passwordFocus() {
    let passwordInput = document.getElementById('password');
    let iconPW = document.querySelector('.pw-wrapper button img');
    let iconPWButton = document.querySelector('.pw-wrapper button');

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
            iconPW.src = './assets/svg/lock.svg';
            iconPW.classList.remove('cursor-pointer');
            iconPWButton.disabled = true;
        } else {
            iconPW.src = './assets/svg/eye.svg';
            iconPW.classList.add('cursor-pointer');
            iconPWButton.disabled = false;
        }
    });
}

/**
 * Toggles the visibility of the password in the login form. When the password is 
 * hidden, it changes the input type to 'text' to show the password and updates 
 * the icon to an eye with a slash. When the password is visible, it changes the 
 * input type back to 'password' and updates the icon to a plain eye. Adds the 
 * 'cursor-pointer' class to the icon for styling.
 * @function togglePassword
 * @returns {undefined}
 */
function togglePassword() {
    let passwordInput = document.getElementById('password');
    let iconPW = document.querySelector('.pw-wrapper button img');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        iconPW.src = './assets/svg/eye_slash.svg';
        iconPW.classList.add('cursor-pointer');
    } else {
        passwordInput.type = 'password';
        iconPW.src = './assets/svg/eye.svg';
        iconPW.classList.add('cursor-pointer');
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
 * Checks the validity of the login form by verifying if the email and password
 * fields are filled. If both fields are filled, enables the login button; otherwise,
 * disables it.
 * @function checkLoginFormValidity
 * @returns {undefined}
 */
function checkLoginFormValidity() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login');

    const loginEmailIsValid = emailInput.value !== '';
    const loginPasswordIsValid = passwordInput.value !== '';

    if (loginEmailIsValid && loginPasswordIsValid) {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }

}

/**
 * Handles the login process by checking the validity of the email and password
 * input and then redirects to the summary page if the credentials are valid.
 * @function loginUser
 * @returns {Promise<void>}
 */
async function loginUser() {
    let registeredUser = users.find(user => user.email === document.getElementById('email').value);
    let errorElement = document.getElementById('error');

    if (!registeredUser) {
        userNotFoundMessage(errorElement);

    } else if (registeredUser.password !== document.getElementById('password').value) {
        passwordIncorrectMessage(errorElement);

    } else {
        let userName = encodeURIComponent(registeredUser.name);
        window.location.href = `summary.html?name=${userName}`;
    }
}

/**
 * Displays an error message indicating that the user was not found.
 * If the message is not already present in the 'messages' array, it is added.
 * The error message is then displayed in the specified error element.
 * @param {HTMLElement} errorElement - The element where the error message will be displayed.
 * @returns {undefined}
 */
function userNotFoundMessage(errorElement) {
    if (!messages.includes('User  not found')) {
        messages.push('User   not found');
    }
    errorElement.innerHTML = messages.join(', ');
    return;
}

/**
 * Displays an error message indicating that the password is incorrect.
 * If the message is not already present in the 'messages' array, it is added.
 * The error message is then displayed in the specified error element.
 * @param {HTMLElement} errorElement - The element where the error message will be displayed.
 * @returns {undefined}
 */
function passwordIncorrectMessage(errorElement) {
    if (!messages.includes('Password incorrect')) {
        messages.push('Password incorrect');
    }
    errorElement.innerHTML = messages.join(', ');
    return;
}

/**
 * Logs in as a guest user by clearing the 'loggedInUser' data and storing it,
 * then redirects to the summary page.
 * @function guestLogIn
 * @returns {Promise<void>}
 */
async function guestLogIn() {
    loggedInUser = "";
    await putData("loggedInUser", loggedInUser);
    window.location.href = "./summary.html";
}