

function init() {
    validateForm();
    passwordFocus()
};

function validateForm() {
    let errorElement = document.getElementById('error');
    let form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
        let messages = []
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

    passwordInput.addEventListener('focus', () => {
        iconPW.src = '../assets/svg/eye.svg';
    });

    reAppearLockIcon(passwordInput, iconPW);
}


function reAppearLockIcon(passwordInput, iconPW) { 
    passwordInput.addEventListener('input', () => {
        console.log('password input field value changed');
        
        if (passwordInput.value === '') {
            iconPW.src = '../assets/svg/lock.svg?v=1';
        } else {
            iconPW.src = '../assets/svg/eye.svg?v=1';
        }
    });
 }
 

function togglePassword() {
    let passwordInput = document.getElementById('password');
    let iconPW = document.querySelector('.pw-wrapper button img');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        iconPW.src = '../assets/svg/eye_slash.svg';
    } else {
        passwordInput.type = 'password';
        iconPW.src = '../assets/svg/eye.svg';
    }
}


/*

function passwordFocus() {
    let passwordInput = document.getElementById('password');
    let iconPW = document.querySelector('.pw-wrapper button img');

    passwordInput.addEventListener('focus', () => iconPW.src = '../assets/svg/eye.svg');
    passwordInput.addEventListener('blur', () => iconPW.src = '../assets/svg/lock.svg');
    passwordInput.addEventListener('input', () => iconPW.src = passwordInput.value === '' ? '../assets/svg/lock.svg' : '../assets/svg/eye.svg');
}



Blur Event Listener

A blur event listener is not just for a smoother transition from one icon to the other.
It's actually used to detect when the password input field loses focus.

What is Focus?

In the context of HTML and JavaScript, focus refers to the state of an element when it is currently being interacted with by the user.
For example, when you click on a text input field, it receives focus, and the cursor appears inside the field.

What is Blur?

Blur is the opposite of focus.
When an element loses focus, it is said to be blurred.
This can happen when the user clicks on another element, presses the tab key to move to the next element, or clicks outside the element.

What does a Blur Event Listener do?

A blur event listener is triggered when the password input field loses focus.
In the context of your code, the blur event listener is used to change the icon back to the lock icon when the password input field loses focus.

Example

Here's an example of how the blur event listener works:

The user clicks on the password input field, and it receives focus.
The focus event listener is triggered, and the icon changes to the eye icon.
The user types something in the password input field.
The user clicks on another element, such as a button or another input field.
The password input field loses focus, and the blur event listener is triggered.
The icon changes back to the lock icon.


*/