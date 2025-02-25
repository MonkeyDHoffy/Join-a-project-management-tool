

function init() {
    validateForm();
    passwordFocus();
    getUsers();

    getQueryParamsUserName();
};

function validateForm() {
    let errorElement = document.getElementById('error');
    let form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
        let messages = [];
        validateEmail(messages);
        validatePassword(messages);
        if (messages.length > 0) {
            e.preventDefault()
            errorElement.innerHTML = messages.join(', ')
        }

    })

}

function validateEmail(messages) {
    let email = document.getElementById('email');
    if (email.value === '' || email.value == null || email.value.includes('@') === false) {
        messages.push('Please enter a valid Email')
        email.classList.add('error-highlight');
    }
}

function validatePassword(messages) {
    let password = document.getElementById('password');
    if (password.value === '' || password.value == null) {
        messages.push('Please enter a password')
        password.classList.add('error-highlight');
    }

    if (password === 'password') {
        messages.push('Password cannot be password')
        password.classList.add('error-highlight');
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
        //iconPW.classList.add('eye_slash_small');  

    } else {
        passwordInput.type = 'password';
        iconPW.src = '../assets/svg/eye.svg';
        iconPW.classList.add('cursor-pointer');

    }
}

function loginUser() {
    let registeredUser = users.find(user => user.email === document.getElementById('email').value);

    if (!registeredUser) {
        alert('User not found');
        return;

    } else if (registeredUser.password !== document.getElementById('password').value) {
        alert('Password incorrect');
        return;

    } else {
        let userName = encodeURIComponent(registeredUser.name);
        window.location.href = `summary.html?name=${userName}`;
    }
}

function getQueryParamsUserName() {
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('name');
    console.log(urlParams.get('name'));
    return userName;
}

function displayUserName() {
    const userName = getQueryParamsUserName();
    const userNameElement = document.getElementById('userName');
    userNameElement.textContent = decodeURIComponent(userName);
  }