

function showSignUpMsg() {

    const signUpMsg = document.getElementById('signUpMsg');
    const backdrop = document.getElementById('backdrop');

    signUpMsg.classList.remove('d-none');
    backdrop.classList.remove('d-none');

    setTimeout(() => {
        window.location.href = "./index.html";
    }, 2000);
    
   

}

