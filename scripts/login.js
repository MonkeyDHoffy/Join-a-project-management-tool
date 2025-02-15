

function init() {
    validateForm();
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
    if (email.value === '' || email.value == null) {
        messages.push('Please enter your email')
    }

    if (email.value.includes('@') === false) {
        messages.push('Email must contain an @ symbol')
    }
    email.classList.add('error-highlight');
}
function validatePassword(messages) {
    let password = document.getElementById('password');
    if (password.value === '' || password.value == null) {
        messages.push('Please enter a password')
    }

    if (password.value.length >= 15) {
        messages.push('Password must be less than 15 characters')
    }

    if (password === 'password') {
        messages.push('Password cannot be password')
    }
}
