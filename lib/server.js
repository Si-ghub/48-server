const http = require('http'); // Node.js turi instaliuota moduli, kuris leidzia Node.js perduoti duomenis per HTTP (Hyper Text Transfer Protocol)
const _data = require('./data');

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
        // turime perskaityti isiminti ir atiduoti turini
        // issispausdinam console.log(trimpedPath) 
        // trimedPath - visaks kas yra uz domeno dalies
        if (trimmedPath === '') {
            // HOME PAGE: http://www.excample.com

            // readHTML gali perskaityti HTML failus, esancius pages folderyje ('index' - failo pavadinimas)
            // turime susikurti data.js faile lib.readHTML kad galetu perskaityti. Susikuriam pagesDir analogiskai kaip js failams
            // _data.readHTML('index') perskaito faila
            const html = await _data.readHTML('index');
            // Network > localhost gauname index.html turini BARSUKAS CONTENT. Response matosi visas html failas
            // kol kas graziname tik html failus, su kitais formatais bus kiti metodai. Sunkiau yra su nuotraukom :(
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

        // analogiskai su about.html failu
        if (trimmedPath === 'about') {
            // ABOUT PAGE: http://www.excample.com/about
            const html = await _data.readHTML('about');
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

        // kaip pasidaryti kelia iki failu
        if (trimmedPath.slice(-4) === '.css') {
            // CSS file
            const fileContent = await _data.readStaticTextFile(trimmedPath);
            if (fileContent === '') {
                res.writeHead(404, {
                    'Content-Type': 'text/css',
                })
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/css',
                })
            }
            return res.end(fileContent);
        }

        if (trimmedPath.slice(-3) === '.js') {
            // JS file
            const fileContent = await _data.readStaticTextFile(trimmedPath);
            // reikia nurodyti status quo, 200 + message. Papildoma komanda kad JS pradetu veikti.
            // is serverio patvirtiname, kad turinys, kuri mes gavome yra tikrai JS tipo
            if (fileContent === '') {
                res.writeHead(404, {
                    'Content-Type': 'text/javascript',
                })
            } else {
                res.writeHead(200, {
                    //reikia tik tokiu formatu nurodyti
                    // response header
                    'Content-Type': 'text/javascript',
                })
            }
            return res.end(fileContent);
        }

        if (trimmedPath.slice(-4) === '.svg') {
            // SVG file
            const fileContent = await _data.readStaticTextFile(trimmedPath);

            if (fileContent === '') {
                res.writeHead(404, {
                    'Content-Type': 'text/svg+xml',
                })
            } else {
                res.writeHead(200, {
                    //reikia tik tokiu formatu nurodyti
                    // response header
                    'Content-Type': 'text/svg+xml',
                })
            }
            return res.end(fileContent);
        }

        res.writeHead(404, {
            // paprastas tekstas - plain
            'Content-Type': 'text/plain',
        })
        return res.end('Content/file not found.');
    })
});

server.init = () => {
    server.httpServer.listen(3000, () => {
        console.log('>>>> Tavo serveris yra pasiekiamas http://localhost:3000 <<<<');
    })
}

module.exports = server;