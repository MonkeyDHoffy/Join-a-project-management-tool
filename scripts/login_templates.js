

/**
 * Renders the login form on the page by setting the innerHTML of the element
 * with the ID 'loginFormBox'. The form includes input fields for email and
 * password, a checkbox for remembering the user, and a submit button. It also
 * provides functionality for toggling password visibility and validating the
 * form fields. The form is submitted using the function 'loginUser()'.
 * @function renderLoginForm
 * @returns {undefined}
 */
function renderLoginForm() {
    let loginForm = document.getElementById('loginFormBox');
    loginForm.innerHTML = `
    <form id="loginForm" novalidate onsubmit="return false">
                    <div class="email-wrapper">
                        <input type="email" placeholder="Email" id="email">
                        <span><img src="../assets/svg/mail.svg" alt=""></span>
                    </div>

                    <div class="pw-wrapper">
                        <input type="password" placeholder="Password" id="password">
                        <button type="button" disabled id="pw-icon" onclick="togglePassword()"><img
                                src="../assets/svg/lock.svg" alt=""></button>
                    </div>
                    <span id="error"></span>

                    <div class="remember-me-wrapper">
                        <input type="checkbox" class="rm-chb" id="rememberMe">
                        <label for="rememberMe" class="checkbox-label">Remember me</label>
                    </div>

                    <div class="login-button-box">
                        <button class="login" type="submit" id="login" disabled onclick="loginUser()">Login</button>
                        <button class="guest-login">Guest Login</button>
                    </div>
                </form>
    `;
}