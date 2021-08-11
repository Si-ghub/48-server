**index.js**
Kaip susikurti serveri, kad jis rodytu index.html failo turini

```js

-turim susiimportuoti is server.js failo  const server = require('./lib/server');
-Cia bus: paternas panasus kad kiekvienas failas kuria savo objekta ir paskui tam objektui kuriame metodus (pvz init) ir tada tuos metodus iskvietinesim - ijungiame serveri (server.js failas). -Minimalistine logika kaip paleisti projekta.
- server.init - inicijuojame serveri
Pradziu pradzia:

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

```

**server.js**

```js
-Bus reikalingi 2 metodai
-Logika kuri paleidzia serveri
-const http =require ('http') - modulis-objektas  turi daug metodu ir status kodus ir  …. Vienas is ju yra metodas kuris moka sukurti serveri  http.createServer();
Si funkcija gauna du dalykus. Gaunam ir atsakom : req (request) ir res (respond). Init metode turim duoti du dalykus: porta (3000) ir kokia zinute isspausdinti
-Mes naudojam server.httpServer.listen(3000, () => taciau yra keli papildomi metodai kuriuos taip pat galima naudoti:

server.httpServer = http.createServer((req, res) => {
    req.on('data', ()=> {
        console.log('uzklausa atsiunte duomenis...')
    })

    req.on('error', ()=> {
        // papildomas metodas. Taip pat gali buti 'close', 'readable', 'resume' ir t.t autocompleat ismeta visus variantus
        console.log('uzklausos klaida...')
    })
}

Mes naudosim:

server.httpServer = http.createServer((req, res) => {
    // kaip detektinti koks yra pilnas URL
     const baseURL = `http${req.socket.encrypted ? 's' : ''}://${req.headers.host}`;
     // visas URL objektas new URL globaliai pasiekiams objektas
     const parsedURL = new URL(req.url, baseURL);
     // pathname gali priekyje ir gale tureti /, daug ir nezinia kiek
     const parsedPathName = parsedURL.pathname;
     // kintamasis, su juo pasidaro ir is pathname ismetam visus  //
     // naudojam RegExp'a: dvi komados g- globalus. ^ is priekio istrink simboli / +- nesvarbu kad ir kiek bebutu | / is galo neribotas kiekis $ - gale esantis
     // apsidorojame uzklausos kelia
     let trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');
     // galim issispausdinti kas yra musu url
    console.log(req.url);

    req.on('data', (data)=> {
        console.log('uzklausa atsiunte duomenis...')
    })

    req.on('end', (data) => {
        console.log('uzklausa baigta...');
        // galim issispausdinti kokia uzklausa bus norima pateikti.
        // reikes perziureti headers: galim suzinoti i koki domena nori kreiptis, url: '/',  method: 'GET'
        console.log(req);
        res.end('RETURN CONTENT');
    })
});

server.init = () => {
    server.httpServer.listen(3000, () => {
        console.log('>>>> Tavo serveris yra pasiekiamas http://localhost:3000 <<<<');
    })
}

Failas su komentarais
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

Fontawesome filu importas:
1. Is buvusio projekto nukopijuojame fonts folderi ir ikopijuojame i savo projekta, pakeiciam pavadinima i fontawesome
2. Taip pat is buvusio projekto nusikopijuojame css/3rd-party/font-awesome


-Turime paleisti du serverius: http (nesaugusis, kuris nukreips I saugu serveri ) ir https. Abu vienu metu.
-Localhost - serveryje localhost atspausdina turini


MIME type of - jei console rodo sio tipo error reiskia kazkas negerai su tipu. Tai yra tas pats failo tipas, tik papildomais pribumbasais tech lygyje
Jis yra svarbus!!!

```

 <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon"> // tinkamiausias budas favicon ikonelei
```
