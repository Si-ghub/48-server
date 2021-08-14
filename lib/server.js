const http = require('http');
const _data = require('./data');

const config = require('../config');

const adminServicesPageHandler = require('./handlers/admin-services'); // susiimportuojame handlerius is nurodyto failo, o tame faile yra funkcija kuri grazina html turini
const homePageHandler = require('./handlers/home-page');
const aboutPageHandler = require('./handlers/about-page');
const notFoundPageHandler = require('./handlers/404-page');

const server = {}

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encrypted ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const parsedPathName = parsedURL.pathname;
    let trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');

    req.on('data', (data) => {
        console.log('uzklausa atsiunte duomenu...');
        console.log(data);
    })

    req.on('end', async (data) => {
        // tekstinio tipo failai
        const textFileExtensions = ['css', 'js', 'svg'];
        // binarinio tipo failai (ne tekstiniai)
        const binaryFileExtensions = ['woff2', 'woff', 'ttf', 'eot', 'otf', 'png', 'jpg', 'ico'];
        // gaunam uzklausa ir issispausdinam
        const urlParts = trimmedPath.split('.');
        // bandom atpazinti ir perskaityti paskutine uzklausos dali uz tasko ir atpazistame 
        const fileExtension = urlParts[urlParts.length - 1];
        const isTextFile = textFileExtensions.includes(fileExtension);
        const isBinaryFile = binaryFileExtensions.includes(fileExtension);

        // pasidarom objekta su visais failu tipais kuris sumapina su FileExtensions
        const MIMES = {
            css: 'text/css',
            js: 'text/javascript',
            svg: 'image/svg+xml',
            woff2: 'font/woff2',
            woff: 'font/woff',
            ttf: 'font/ttf',
            eot: 'application/vnd.ms-fontobject',
            otf: 'font/otf',
            png: 'image/png',
            jpg: 'image/jpeg',
            ico: 'image/x-icon'
        }

        //graziname tekstini arba binarini faila -> textFileExtensions || binaryFileExtensions
        if (isTextFile || isBinaryFile) {
            let fileContent = '';
            if (isTextFile) {
                fileContent = await _data.readStaticTextFile(trimmedPath);
            } else {
                fileContent = await _data.readStaticBinaryFile(trimmedPath);
            }

            if (fileContent === '') {
                res.writeHead(404, {
                    'Content-Type': MIMES[fileExtension],
                })
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension],
                    'Cache-Control': 'max-age=3000000', // kiek sekundziu narsykle laiko atmintyje (cache)
                })
            }
            return res.end(fileContent);
        } else {
            // PAGES
            let handler = server.routes[trimmedPath]; // kreipiames i objekta server.routes
            handler = typeof handler === 'function' ? handler : server.routes['404'];

            const html = handler(); // iskvieti funkcija kuria gavome handleryje. Turi grazinti turini.
            if (html === '') {
                res.writeHead(404, {
                    'Content-Type': 'text/html',
                })
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                })
            }
            return res.end(html);
        }

        // res.writeHead(404, {
        //     'Content-Type': 'text/plain',
        // })
        // return res.end('Content/file not found.');
    })
});

server.routes = {
    '': homePageHandler,
    '404': notFoundPageHandler,
    'about': aboutPageHandler,
    'admin/services': adminServicesPageHandler, //jei nuoroda admin/services daryt ta ir ana
}

server.init = () => {
    server.httpServer.listen(config.httpPort, () => {
        console.log(`Tavo serveris yra pasiekiamas http://localhost:${config.httpPort}`);
    })
}

module.exports = server;