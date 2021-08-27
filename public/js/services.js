import { ajax } from "./ajax.js";

const formMessageDOM = document.querySelector('.form-messages');
const pFormMessageDOM = formMessageDOM.querySelector('.message');
const closeMessageDOM = formMessageDOM.querySelector('.close');
const formDOM = document.querySelector('.form'); // kol kas nelieciam
const serviceNameDOM = document.getElementById('service_name');
const urlSlugDOM = document.getElementById('slug');
const shortDescriptionDOM = document.getElementById('short_desc');
const fullDescriptionDOM = document.getElementById('full_desc');
const priceDOM = document.getElementById('price');
const isActiveDOM = document.getElementById('is_active');
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

    const serviceName = serviceNameDOM.value;
    const urlSlug = urlSlugDOM.value;
    const shortDescription = shortDescriptionDOM.value;
    const fullDescription = fullDescriptionDOM.value;
    const price = priceDOM.value;
    const isActive = isActiveDOM.checked;

    if (isActive) {
        if (serviceName === '') {
            return showMessage('error', '"ServiceName" negali buti tuscias');
        }
        if (urlSlug === '') {
            return showMessage('error', '"UrlSlug" negali buti tuscias');
        }
        if (shortDescription === '') {
            return showMessage('error', '"ShortDescription" negali buti tuscias');
        }
        if (fullDescription === '') {
            return showMessage('error', '"FullDescription" negali buti tuscias');
        }
        if (price === '') {
            return showMessage('error', '"Price" negali buti tuscias');
        }
    } else {
        if (serviceName === '') {
            return showMessage('error', '"ServiceName" negali buti tuscias');
        }
        if (urlSlug === '') {
            return showMessage('error', '"UrlSlug" negali buti tuscias');
        }
    }

    closeMessage();
    ajax({
        method: 'POST', // siuntimo budas
        headers: {},
        endpoint: 'api/services',
        data: { serviceName, urlSlug, shortDescription, fullDescription, price, isActive }
    }, responseAction);
}

// gaunam atsaka
function responseAction(response) {
    try {
        const responseObject = JSON.parse(response);
        if (responseObject.error) {
            showMessage('error', responseObject.error);
            return;
        }
        showMessage('success', 'Paslauga sekmingai prideta');
        location.href = '/admin/services';

    } catch (error) {
        showMessage('error', 'Serverio klaida!');
    }
}

closeMessageDOM.addEventListener('click', closeMessage);

submitDOM.addEventListener('click', submitFormInfo);

// showMessage('info', 'Labas');
// showMessage('success', 'Tau pavyko!');
// showMessage('error', 'Kazkur yra klaida!');