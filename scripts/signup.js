
function init() {
    validateForm();
    passwordFocus(document.getElementById('password'));
    passwordFocus(document.getElementById('passwordRepeat'));
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
    form.addEventListener('submit', (e) => {
        let messages = [];
        validateEmail(messages);
        validatePassword(password, messages);
        validatePassword(passwordRepeat, messages);
        comparePasswords(password, passwordRepeat, messages)
        
        if (messages.length > 0) {
            e.preventDefault()
            errorElement.innerHTML = messages.join(', ')
        }
        showSignUpMsg();
    })
}

function comparePasswords(password, passwordRepeat, messages) {
    password = document.getElementById('password');
    passwordRepeat = document.getElementById('passwordRepeat');

    if (password.value !== passwordRepeat.value) {
        messages.push('Passwords do not match');
    }
}


function validateEmail(messages) {
    let email = document.getElementById('email');
    if (email.value === '' || email.value == null || email.value.includes('@') === false) {
        messages.push('Please enter a valid Email')
        email.classList.add('error-highlight');
    }
}

function validatePassword(inputElementPW, messages) {
    //let password = document.getElementById('password');
    if (inputElementPW.value === '' || password.value == null) {
        messages.push('Please enter a password')
        inputElementPW.classList.add('error-highlight');
    }

    if (inputElementPW.value === 'password') {
        messages.push('Password cannot be password')
        inputElementPW.classList.add('error-highlight');
    }
}


// function passwordFocus(passwordInput) {

//     let iconPW = document.querySelector('.pw-wrapper button img');
//     let iconPWButton = document.querySelector('.pw-wrapper button');

//     reAppearLockIcon(passwordInput, iconPW, iconPWButton);
//}



function passwordFocus() {
    let passwordInput = document.getElementById('password');
    let repPasswordInput = document.getElementById('repeatPassword');
    let iconPW = document.querySelector('.pw-wrapper button img');
    let IconRepPw = document.querySelector('.rep-pw-wrapper button img');
    let iconPWButton = document.querySelector('.pw-wrapper button');
    let IconRepPwButton = document.querySelector('.rep-pw-wrapper button');

    reAppearLockIcon(passwordInput, repPasswordInput, iconPW, IconRepPw, iconPWButton, IconRepPwButton);
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

