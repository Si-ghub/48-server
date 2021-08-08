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

-Turime paleisti du serverius: http (nesaugusis, kuris nukreips I saugu serveri ) ir https. Abu vienu metu.
-Localhost - serveryje localhost atspausdina turini


MIME type of - jei console rodo sio tipo error reiskia kazkas negerai su tipu. Tai yra tas pats failo tipas, tik papildomais pribumbasais tech lygyje
Jis yra svarbus!!!

```
