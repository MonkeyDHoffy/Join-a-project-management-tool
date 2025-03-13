let messages = [];

function loginInit() {

    validateForm();
    passwordFocus();
    getUsers();
    handleAnimationBackdrop();
    animateLogo();
    //loginUser(messages);
};

function handleAnimationBackdrop() {
    const backdrop = document.getElementById('backdrop');
    backdrop.addEventListener('animationend', () => {
        backdrop.classList.add('d-none');
        backdrop.remove();
    });
}

// function animateLogo() {
//     if (!localStorage.getItem("animationRun")) {
//       document.querySelector(".p1-logo").classList.add("animate");
//       localStorage.setItem("animationRun", "true");
//     }
//   }

function animateLogo() {
    let animationRun = false;
    if (!animationRun) {
        document.querySelector(".p1-logo").classList.add("animate");
        animationRun = true;
    }
}

function validateForm() {
    let errorElement = document.getElementById('error');
    let form = document.getElementById('loginForm');
    //let messages = [];
    form.addEventListener('input', (e) => {

        messages.length = 0;
        errorElement.innerHTML = '';

        validateEmail(messages);
        validatePassword(messages);
        checkLoginFormValidity();
        rememberMe();
        getRememberMeUser();
        if (messages.length > 0) {
            e.preventDefault()
            errorElement.innerHTML = messages.join(', ')
        }
    })
}


function validateEmail(messages) {
    let email = document.getElementById('email');
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.value === '' || email.value == null || !emailRegex.test(email.value)) {
        if (!messages.includes('Please enter a valid Email')) {
            messages.push('Please enter a valid Email');
        }
        email.parentNode.classList.add('error-highlight');
    } else {
        removeErrorMessageAndHighlight(email, messages, 'Please enter a valid Email');
    }
}


function validatePassword(messages) {
    let password = document.getElementById('password');
    if (password.value === '' || password.value == null) {
        if (!messages.includes('Please enter a password')) {
            messages.push('Please enter a password');
        }
        password.parentNode.classList.add('error-highlight');

    } else {
        removeErrorMessageAndHighlight(password, messages, 'Please enter a password');
    }

    if (password.value === 'password') {
        if (!messages.includes('Password cannot be password')) {
            messages.push('Password cannot be password');
        }
        password.parentNode.classList.add('error-highlight');
    }
}


function passwordFocus() {
    let passwordInput = document.getElementById('password');
    let iconPW = document.querySelector('.pw-wrapper button img');
    let iconPWButton = document.querySelector('.pw-wrapper button');

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


function togglePassword() {
    let passwordInput = document.getElementById('password');
    let iconPW = document.querySelector('.pw-wrapper button img');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        iconPW.src = '../assets/svg/eye_slash.svg';
        iconPW.classList.add('cursor-pointer');
    } else {
        passwordInput.type = 'password';
        iconPW.src = '../assets/svg/eye.svg';
        iconPW.classList.add('cursor-pointer');
    }
}


function removeErrorMessageAndHighlight(inputElement, messages, errorMessage) {
    let index = messages.indexOf(errorMessage);
    if (index > -1) {
        messages.splice(index, 1);
    }
    inputElement.parentNode.classList.remove('error-highlight');
}


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
    renderLoginButtons();
}


function rememberMe() {
    const rememberMeChbx = document.getElementById('rememberMe');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    rememberMeChbx.addEventListener('click', () => {

        if (rememberMeChbx.checked) {
            localStorage.setItem('rmEmail', emailInput.value);
            localStorage.setItem('rmPassword', passwordInput.value);
        } else {
            localStorage.removeItem('rmEmail');
            localStorage.removeItem('rmPassword');
        }
    });
}


function getRememberMeUser() {
    const rmEmail = localStorage.getItem('rmEmail');
    const rmPassword = localStorage.getItem('rmPassword');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeChbx = document.getElementById('rememberMe');

    if (rmEmail && rmPassword) {
        emailInput.value = rmEmail;
        passwordInput.value = rmPassword;
        rememberMeChbx.checked = true;
    }
}


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


function userNotFoundMessage(errorElement) {
    if (!messages.includes('User  not found')) {
        messages.push('User   not found');
    }
    errorElement.innerHTML = messages.join(', ');
    return;
}

function passwordIncorrectMessage(errorElement) {
    if (!messages.includes('Password incorrect')) {
        messages.push('Password incorrect');
    }
    errorElement.innerHTML = messages.join(', ');
    return;
}



// function loginUser() {
//     let registeredUser  = users.find(user => user.email === document.getElementById('email').value);
//     let errorElement = document.getElementById('error');

//     if (!registeredUser ) {
//         errorElement.innerHTML = 'User  not found';
//         return;
//     } else if (registeredUser .password !== document.getElementById('password').value) {
//         errorElement.innerHTML = 'Password incorrect';
//         return;
//     } else {
//         let userName = encodeURIComponent(registeredUser .name);
//         window.location.href = `summary.html?name=${userName}`;
//     }
// }
