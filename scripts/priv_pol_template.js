

/**
 * Renders the Privacy Policy and Legal Notice at the bottom of the page.
 * 
 * The Privacy Policy and Legal Notice are displayed as links. The links
 * point to the respective pages.
 * 
 */
function renderPrivPol() {
    document.getElementById('privPolBox').innerHTML = `
        <div class="prvt-polce-legl-note">
            <a href="./datenschutz_login.html" class="priv-legal">Privacy Policy</a>
            <a href="./legal_notice_login.html" class="priv-legal">Legal notice</a>
        </div>`;
}