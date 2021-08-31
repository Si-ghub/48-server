const server = require('./lib/server');
const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'barsukas',
    });

    // paruosti reikiamus direktorijas

    // paruosti reikiamus failus

    // inicijuojame serveri
    server.init(connection);
}

app.init();

module.exports = app;