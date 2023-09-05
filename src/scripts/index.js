import { loginTokenRequest } from "./requests.js";

function login() {
    const btnAcess = document.querySelector("#login__submit")
    btnAcess.addEventListener('click', async (e) => {
        e.preventDefault()
        const wrongEmail = document.querySelector('#wrong-email');
        const wrongPassword = document.querySelector('#wrong-password');

        wrongEmail.classList.add("hidden")
        wrongPassword.classList.add("hidden")

        const email = document.querySelector('#Email').value;
        const password = document.querySelector('#Senha').value;

        const bodyRequest = {
            email: email,
            password: password,
        }

        const tokenUser = await loginTokenRequest(bodyRequest)
    })
}

function hadleRegisterPage() {
    const btnRegister = document.querySelector('#register__button');

    btnRegister.addEventListener('click', ()=> {
        location.replace(`./src/pages/register.html`)
    })
}

function main() {
    login()
    hadleRegisterPage()  
}

main()