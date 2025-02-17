

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

function passwordFocus() {
    let passwordInput = document.getElementById('password');
    let iconPW = document.querySelector('.pw-wrapper button img');
    
    passwordInput.addEventListener('focus', () => {
    
      iconPW.src = '../assets/svg/eye.svg';
    });

    
}


/*
// Add an event listener to the button for the click event
document.querySelector('.pw-wrapper button').addEventListener('click', () => {
  // Toggle the type attribute of the input field
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.src = '../assets/svg/eye-slash.svg';
  } else {
    passwordInput.type = 'password';
    icon.src = '../assets/svg/eye.svg';
  }
});



*/