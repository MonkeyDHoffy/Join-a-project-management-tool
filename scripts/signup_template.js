

/**
 * Renders the sign-up form on the page by setting the innerHTML of the element
 * with the ID 'signupFormBox'. The form includes input fields for name, email,
 * password, and password confirmation, along with a checkbox for agreeing to
 * the privacy policy. It also provides functionality for toggling password
 * visibility and validating the privacy policy agreement. The form is
 * submitted using the function 'registerUser()'.
 */
function renderSignupForm() {
    document.getElementById('signupFormBox').innerHTML = `

 <form id="signupForm" novalidate onsubmit="registerUser(); return false">

     <div class="name-wrapper">
         <input type="text" placeholder="Name" id="signupName">
        <span><img src="../assets/svg/person.svg" alt=""></span>
    </div>

    <div class="email-wrapper">
        <input type="email" placeholder="Email" id="email">
        <span><img src="../assets/svg/mail.svg" alt=""></span>
    </div>

    <div class="pw-wrapper">
        <input type="password" placeholder="Password" id="password">
        <button type="button" disabled id="pwIcon" onclick="togglePasswordVisibility(this)"><img
            src="../assets/svg/lock.svg" alt=""></button>
    </div>

    <div class="rep-pw-wrapper">
        <input type="password" placeholder="Password" id="repeatPassword">
        <button type="button" disabled id="repPwIcon" onclick="togglePasswordVisibility(this)"><img
                 src="../assets/svg/lock.svg" alt=""></button>
    </div>

     <span id="error"></span>

    <div class="sgnp-button-box">

        <div class="confirm-priv-pol">
            <input type="checkbox" class="chb-priv-pol" id="chbPrivPol" onclick="toggleErrorPrivPol()">
            <label for="chbPrivPol">I agree to the <a href="#" class="priv-polce-link"> Privacy
                    policy</a></label>

        </div>
        <span id="errorPrivPol"></span> <!--onclick="showSignUpMsg(); return false" -->
        <button type="submit" class="signup" id="submitBtn" disabled>Sign up</button>
        <div class="signup-msg  d-none" id="signUpMsg">You have successesfully signed up</div>
    </div>
</form>
 `
}