const _data = require('../../data');
const helpers = require('../../helpers');

const handlers = {}

handlers.users = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._users[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' })
}

handlers._users = {}

handlers._users.get = (data, callback) => {
    // gaunam user info
    return callback(200, {
        success: 'Tau beveik pavyko: GET',
        receivedData: data,
    })
}

handlers._users.post = async (data, callback) => {
    // irasom user info
    const { username, email, password } = data.payload;

    const hashedPassword = helpers.hash(password);

    const userObject = {
        username,
        email,
        hashedPassword,
        registerDate: Date.now(),
    }

    const res = await _data.create('users', email, userObject);

    if (res !== true) {
        return callback(400, {
            error: 'Nepavyko sukurti vartotojo',
        })
    }

    return callback(200, {
        success: 'Vartotojas sukurtas',
    })
}

handlers._users.put = (data, callback) => {
    // atnaujinam user info
    return callback(200, {
        success: 'Tau beveik pavyko: PUT',
        receivedData: data,
    })
}

handlers._users.delete = (data, callback) => {
    // istrinam user info
    return callback(200, {
        success: 'Tau beveik pavyko: DELETE',
        receivedData: data,
    })
}

module.exports = handlers;