// Desenvolva as funcionalidades de cadastro aqui
import { createUserRequest } from "./requests.js";

const handleHome = (() => {
    const homeBtn = document.querySelector('#redirect__button');

    homeBtn.addEventListener('click', ()=> {
        location.replace(`../../index.html`)
    })
})
handleHome();

const register = (()=> {
    const registerBtn = document.querySelector('#register__submit')

    registerBtn.addEventListener('click', async(e) => {
        e.preventDefault()
        const inputsForm = document.querySelectorAll('input')

        const bodyRegister = {
            username: inputsForm[0].value,
            email: inputsForm[1].value,
            password: inputsForm[3].value,
            avatar: inputsForm[2].value
        }

        const user = await createUserRequest(JSON.stringify(bodyRegister))
    })
});
register()
