const _data = require('../../data');
const helpers = require('../../helpers');

const handlers = {}

handlers.autos = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._autos[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' })
}

handlers._autos = {}

handlers._autos.get = async (data, callback) => {
    // gaunam automobilio info
    const uniqueNumber = data.queryStringObject.get('uniqueNumber');

    if (uniqueNumber === '') {
        return callback(400, {
            error: 'Nenurodytas unikalus numeris',
        })
    }

    const content = await _data.read('autos', uniqueNumber);
    if (content === '') {
        return callback(400, {
            error: 'Nurodytas automobilis nerastas',
        })
    }

    const contentObj = helpers.parseJsonToObject(content);
    //delete contentObj.hashedPassword;

    return callback(200, {
        success: contentObj,
    })
}

handlers._autos.post = async (data, callback) => {
    // irasom automobilio info
    const { carname, model, uniqueNumber } = data.payload;

    //const hashedPassword = helpers.hash(password);

    const userObject = {
        carname,
        model,
        uniqueNumber,
        registerDate: Date.now(),
    }

    const res = await _data.create('autos', uniqueNumber, userObject); //kokius duomenis siuncia

    if (res !== true) {
        return callback(400, {
            error: 'Nepavyko sukurti objekto',
        })
    }

    return callback(200, {
        success: 'Objektas sukurtas',
    })
}

handlers._autos.put = async (data, callback) => {
    // atnaujinam user info
    const { carname, model, uniqueNumber } = data.payload;

    if (!uniqueNumber) {
        return callback(400, {
            error: 'Nenurodytas automobilio unikalus numeris, kuriam reikia atnaujinti informacija',
        })
    }

    if (!carname && !model) {
        return callback(400, {
            error: 'Nenurodyta nei viena reiksme, kuria norima atnaujinti',
        })
    }

    const content = await _data.read('autos', uniqueNumber);
    if (content === '') {
        return callback(400, {
            error: 'Nurodytas automobilis nerastas',
        })
    }

    const contentObj = helpers.parseJsonToObject(content);

    if (carname) {
        // atnaujiname carname
        contentObj.carname = carname;
    }

    if (model) {
        // atnaujiname model
        // const hashedPassword = helpers.hash(password);
        contentObj.model = model;
    }

    const res = await _data.update('autos', uniqueNumber, contentObj);

    if (res) {
        return callback(200, {
            success: 'Automobilio informacija atnaujinta',
        })
    } else {
        return callback(400, {
            error: 'Ivyko klaida bandant atnaujinti automobilio informacija',
        })
    }
}

handlers._autos.delete = async (data, callback) => {
    // istrinam auto info
    const uniqueNumber = data.queryStringObject.get('uniqueNumber');

    if (uniqueNumber === '') {
        return callback(400, {
            error: 'Nenurodytas unikalaus numerio parametras',
        })
    }

    const res = await _data.delete('autos', uniqueNumber);
    if (res) {
        return callback(200, {
            success: 'Nurodytas automobilis istrintas',
        })
    } else {
        return callback(400, {
            error: 'Ivyko klaida bandant istrinti automobili',
        })
    }
}

module.exports = handlers;