function renderLoginButtons() {
    let logoinButtons = document.querySelector('.login-button-box');
    logoinButtons.innerHTML = `
    <button class="login" type="submit" id="login" disabled onclick="loginUser()">Login</button>
    <button class="guest-login">Guest Login</button>`;

}