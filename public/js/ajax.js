
function ajax(request, callback) {
    const { method, headers, endpoint, data } = request; // is request kintamojo
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];

    if (!methods.includes(method) ||
        typeof endpoint !== 'string' ||
        endpoint === '' ||
        typeof callback !== 'function') {
        return false;
    }

    const xhttp = new XMLHttpRequest(); // js ⁂ klase kurios deka pakuriamas objektas

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            callback(this.responseText);
            return true;
        }
    }

    xhttp.open(method, endpoint, true);

    for (header in headers) {
        xhttp.setRequestHeader(header, headers[header]);
    }

    if (method === 'GET' || method === 'DELETE') {
        xhttp.send();
    }

    if (method === 'POST' || method === 'PUT') {
        xhttp.send(JSON.stringify(data));
    }
}

export { ajax }