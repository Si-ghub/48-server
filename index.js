const server = require('./lib/server');

const app = {}

app.init = () => {
    // paruosti reikiamus direktorijas

    // paruosti reikiamus failus

    // inicijuojame serveri
    server.init();
}

app.init();

module.exports = app;