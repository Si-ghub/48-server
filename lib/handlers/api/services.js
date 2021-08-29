const _data = require('../../data');
const helpers = require('../../helpers');

const handlers = {}

handlers.services = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._services[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' })
}

handlers._services = {}

handlers._services.get = async (data, callback) => {
    // gaunam paslaugos info
    const uniqueNumber = data.queryStringObject.get('uniqueNumber');

    if (uniqueNumber === '') {
        return callback(400, {
            error: 'Nenurodytas URL numeris',
        })
    }

    const content = await _data.read('services', uniqueNumber);
    if (content === '') {
        return callback(400, {
            error: 'Nurodyta paslauga nerasta',
        })
    }

    const contentObj = helpers.parseJsonToObject(content);
    //delete contentObj.hashedPassword;

    return callback(200, {
        success: contentObj,
    })
}

//padaryta
handlers._services.post = async (data, callback) => {
    // irasom paslaugos info
    const { serviceName, urlSlug, shortDescription, fullDescription, price, isActive } = data.payload;

    if (serviceName === "") {
        return callback(400, {
            error: 'Paslaugos pavadinimas negali buti tuscias!',
        })
    }

    if (urlSlug === "") {
        return callback(400, {
            error: 'Paslaugos URL negali buti tuscias!',
        })
    }

    const serviceObject = {
        serviceName,
        urlSlug,
        shortDescription,
        fullDescription,
        price,
        isActive
    }

    const res = await _data.create('services', urlSlug, serviceObject); //kokius duomenis siuncia

    if (res !== true) {
        return callback(400, {
            error: 'Nepavyko sukurti paslaugos',
        })
    }

    return callback(200, {
        success: 'Paslauga sukurta',
    })
}

handlers._services.put = async (data, callback) => {
    // atnaujinam paslaugos info
    const { serviceName, urlSlug, shortDescription, fullDescription, price, isActive } = data.payload;

    if (!urlSlug) {
        return callback(400, {
            error: 'Nenurodytas URL, kuriam reikia atnaujinti informacija',
        })
    }

    if (serviceName === "") {
        return callback(400, {
            error: 'Paslaugos pavadinimas negali buti tuscias!',
        })
    }

    if (urlSlug === "") {
        return callback(400, {
            error: 'Paslaugos URL negali buti tuscias!',
        })
    }

    const serviceObject = {
        serviceName,
        urlSlug,
        shortDescription,
        fullDescription,
        price,
        isActive
    }

    const res = await _data.update('services', urlSlug, serviceObject);

    if (res !== true) {
        return callback(400, {
            error: 'Nepavyko sukurti paslaugos',
        })
    }

    return callback(200, {
        success: 'Paslauga sukurta',
    })
}

handlers._services.delete = async (data, callback) => {
    // istrinam paslauga info
    const urlSlug = data.queryStringObject.get('urlSlug');

    if (urlSlug === '') {
        return callback(400, {
            error: 'Nenurodytas URL',
        })
    }

    const res = await _data.delete('services', urlSlug);
    if (res) {
        return callback(200, {
            success: 'Nurodyta paslauga istrinta',
        })
    } else {
        return callback(400, {
            error: 'Ivyko klaida bandant istrinti paslauga',
        })
    }
}

module.exports = handlers;