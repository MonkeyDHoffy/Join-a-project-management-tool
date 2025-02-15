

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
    if (email.value === '' || email.value == null  || email.value.includes('@') === false) {
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
