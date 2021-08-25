import { ajax } from "./ajax.js";

const formMessageDOM = document.querySelector('.form-messages');
const pFormMessageDOM = formMessageDOM.querySelector('.message');
const closeMessageDOM = formMessageDOM.querySelector('.close');
const formDOM = document.querySelector('.form');
const emailDOM = document.getElementById('email');
const passDOM = document.getElementById('pass');
const submitDOM = document.querySelector('button');

function showMessage(state, msg) {
    const allowedStates = ['info', 'success', 'error'];
    if (allowedStates.includes(state)) {
        formMessageDOM.classList.add('show');
        formMessageDOM.dataset.state = state;
        pFormMessageDOM.innerText = msg;
    }
}

function closeMessage() {
    formMessageDOM.classList.remove('show');
}

function submitFormInfo(e) {
    e.preventDefault();

    const minimumPasswordLength = 8;

    const email = emailDOM.value;
    const pass = passDOM.value;

    if (email === '') {
        return showMessage('error', '"Email" negali buti tuscias');
    }
    if (pass.length < minimumPasswordLength) {
        return showMessage('error', `"Password" negali buti trumpesnis nei ${minimumPasswordLength} simboliai`);
    }

    closeMessage();
    ajax({
        method: 'POST', // siuntimo budas
        headers: {},
        endpoint: 'api/token',
        data: { email, password: pass }
    }, responseAction);
}

// gaunam atsaka
function responseAction(response) {
    try {
        const responseObject = JSON.parse(response);
        if (responseObject.error) {
            localStorage.removeItem('login-token');
            showMessage('error', responseObject.error);
        }
        localStorage.setItem('login-token', responseObject.token);
        showMessage('success', 'Token gautas ;)');
        setTimeout(() => {
            location.href = '/admin';
        }, 2000)
    } catch (error) {
        showMessage('error', 'Serverio klaida!');
    }
}

closeMessageDOM.addEventListener('click', closeMessage);

submitDOM.addEventListener('click', submitFormInfo);

// showMessage('info', 'Labas');
// showMessage('success', 'Tau pavyko!');
// showMessage('error', 'Kazkur yra klaida!');