
function init() {
    validateForm();
    passwordFocus();
    checkFormValidity();

};


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


function validateForm() {
    let errorElement = document.getElementById('error');
    let form = document.getElementById('signupForm');
    let messages = [];

    form.addEventListener('input', (e) => {
        messages = [];
        let password = document.getElementById('password');
        let repeatPassword = document.getElementById('repeatPassword');
        
        validateName(messages);
        validateEmail(messages);
        validatePassword(password, messages);
        validatePassword(repeatPassword, messages);
        comparePasswords(password, repeatPassword, messages)

        if (messages.length > 0) {
            e.preventDefault()
            errorElement.innerHTML = messages.join(', ')
        } else {
            errorElement.innerHTML = '';
            showSignUpMsg();
        }
        //showSignUpMsg();
    })
}

function comparePasswords(password, repeatPassword, messages) {
   // password = document.getElementById('password');
    //repeatPassword = document.getElementById('repeatPassword');

    if (password.value !== repeatPassword.value) {
        if (!messages.includes('Passwords do not match')) {
            messages.push('Passwords do not match');
        }
        password.classList.add('error-highlight');
        repeatPassword.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(password, messages, 'Passwords do not match');
        removeErrorMessageAndHighlight(repeatPassword, messages, 'Passwords do not match');
    }
}

function removeErrorMessageAndHighlight(inputElement, messages, errorMessage) {

    let index = messages.indexOf(errorMessage);
    if (index > -1) {
        messages.splice(index, 1);
    }
    inputElement.classList.remove('error-highlight');
}


function validateName(messages) {
    let signupName = document.getElementById('signupName');
    if (signupName.value === '' || signupName.value == null) {
        messages.push('Please enter your name')
        signupName.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(signupName, messages, 'Please enter your name')
    }
}


function validateEmail(messages) {
    let email = document.getElementById('email');
    if (email.value === '' || email.value == null || email.value.includes('@') === false) {
        messages.push('Please enter a valid Email')
        email.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(email, messages, 'Please enter a valid Email')
    }
}

function validatePassword(inputElementPW, messages) {
    if (inputElementPW.value === '' || inputElementPW.value == null) {
        if (!messages.includes('Please enter a password')) {
            messages.push('Please enter a password');
        }
        inputElementPW.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(inputElementPW, messages, 'Please enter a password');
    }

    if (inputElementPW.value === 'password') {
        if (!messages.includes('Password cannot be password')) {
            messages.push('Password cannot be password');
        }
        inputElementPW.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(inputElementPW, messages, 'Password cannot be password');
    }
}

function passwordFocus() {
    setupPasswordField('password', '.pw-wrapper button img', '.pw-wrapper button');
    setupPasswordField('repeatPassword', '.rep-pw-wrapper button img', '.rep-pw-wrapper button');
}

function setupPasswordField(passwordInputId, iconSelector, buttonSelector) {
    let passwordInput = document.getElementById(passwordInputId);
    let iconPW = document.querySelector(iconSelector);
    let iconPWButton = document.querySelector(buttonSelector);

    reAppearLockIcon(passwordInput, iconPW, iconPWButton);
}

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

function checkFormValidity() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeatPassword');
    const chbPrivPol = document.getElementById('chbPrivPol');
    const submitBtn = document.getElementById('submitBtn');

    const emailIsValid = email.value !== '' && email.value.includes('@');
    const passwordIsValid = password.value !== '' && password.value !== 'password';
    const repeatPasswordIsValid = repeatPassword.value !== '' && repeatPassword.value !== 'password';
    const privPolIsChecked = chbPrivPol.checked;

    if (emailIsValid && passwordIsValid && repeatPasswordIsValid && privPolIsChecked) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}
