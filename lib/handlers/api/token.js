const _data = require('../../data');
const helpers = require('../../helpers');

const handlers = {}

handlers.token = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._token[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' })
}

handlers._token = {}

handlers._token.get = async (data, callback) => {
    // gaunam user info
    const email = data.queryStringObject.get('email');

    if (email === '') {
        return callback(400, {
            error: 'Nenurodytas email parametras',
        })
    }

    const content = await _data.read('token', email);
    if (content === '') {
        return callback(400, {
            error: 'Nurodytas vartotojas nerastas',
        })
    }

    const contentObj = helpers.parseJsonToObject(content);
    delete contentObj.hashedPassword;

    return callback(200, {
        success: contentObj,
    })
}

handlers._token.post = async (data, callback) => {
    // irasom user info
    const { email, password } = data.payload;

    const userData = await _data.read('users', email);
    if (userData === '') {
        return callback(404, {
            error: 'Nepavyko rasti vartotojo, arba neteisinga email ir slaptazodzio kombinacija',
        })
    }

    const userDataObject = helpers.parseJsonToObject(userData);
    const hashedPassword = helpers.hash(password);

    if (userDataObject.hashedPassword !== hashedPassword) {
        return callback(404, {
            error: 'Nepavyko rasti vartotojo, arba neteisinga email ir slaptazodzio kombinacija',
        })
    }

    const token = helpers.createRandomString(20);

    const tokenObject = {
        token,
        email,
        expire: Date.now() + 86400000,
    }

    const res = await _data.create('token', token, tokenObject);

    if (res !== true) {
        return callback(400, {
            error: 'Nepavyko sukurti vartotojo token',
        })
    }

    return callback(200, tokenObject);
}

handlers._token.put = async (data, callback) => {
    // atnaujinam user info
    const { username, email, password } = data.payload;

    if (!email) {
        return callback(400, {
            error: 'Nenurodytas vartotojo email, kuriam reikia atnaujinti informacija',
        })
    }

    if (!username && !password) {
        return callback(400, {
            error: 'Nenurodyta nei viena reiksme, kuria norima atnaujinti',
        })
    }

    const content = await _data.read('token', email);
    if (content === '') {
        return callback(400, {
            error: 'Nurodytas vartotojas nerastas',
        })
    }

    const contentObj = helpers.parseJsonToObject(content);

    if (username) {
        // atnaujiname username
        contentObj.username = username;
    }

    if (password) {
        // atnaujiname password
        const hashedPassword = helpers.hash(password);
        contentObj.hashedPassword = hashedPassword;
    }

    const res = await _data.update('token', email, contentObj);

    if (res) {
        return callback(200, {
            success: 'Vartotojo informacija atnaujinta',
        })
    } else {
        return callback(400, {
            error: 'Ivyko klaida bandant atnaujinti vartotojo informacija',
        })
    }
}

handlers._token.delete = async (data, callback) => {
    // istrinam user info
    const email = data.queryStringObject.get('email');

    if (email === '') {
        return callback(400, {
            error: 'Nenurodytas email parametras',
        })
    }

    const res = await _data.delete('token', email);
    if (res) {
        return callback(200, {
            success: 'Nurodytas vartotojas istrintas',
        })
    } else {
        return callback(400, {
            error: 'Ivyko klaida bandant istrinti vartotoja',
        })
    }
}

handlers._token.verify = async (tokenStr) => {
    const tokenContent = await _data.read('token', tokenStr);
    if (tokenContent === '') {
        return false;
    }

    const tokenContentObj = helpers.parseJsonToObject(tokenContent);
    if (!tokenContentObj.expire ||
        tokenContentObj.expire < Date.now()) {
        return false;
    }
    return tokenContentObj.email;
}

module.exports = handlers;