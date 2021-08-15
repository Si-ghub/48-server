const fs = require('fs').promises;
const path = require('path');

const lib = {}

lib.baseDir = path.join(__dirname, '../.data/');
// reikia, kad galetume pasiekti pages folderi ir jame esancius failus
// is ten kur esu reikia nueiti i pages folderi, o tada lib.readHTML (perskaityti 'index' faila)
lib.pagesDir = path.join(__dirname, '../pages/');
// reikia, kad galetume pasiekti templates folderi ir jame esancius failus, kuriuos naudosime handler folderyje esanciuose failuose
lib.templatesDir = path.join(__dirname, '../templates/');
lib.publicDir = path.join(__dirname, '../public/');

function fullPath(dir, file) {
    return `${lib.baseDir}${dir}/${file}.json`;
}

// funkcija, kuri skaito failo turini
lib.read = async (dir, file) => {
    try {
        return await fs.readFile(fullPath(dir, file), 'utf-8');
    } catch (error) {
        return '';
    }
}

lib.create = async (dir, file, data) => {
    let fileDescriptor = null;
    try {
        fileDescriptor = await fs.open(fullPath(dir, file), 'wx');
        fs.writeFile(fileDescriptor, JSON.stringify(data));
        return true;
    } catch (error) {
        return error;
    } finally {
        if (fileDescriptor) {
            fileDescriptor.close();
        }
    }
}

lib.update = async (dir, file, data) => {
    let fileDescriptor = null;
    try {
        fileDescriptor = await fs.open(fullPath(dir, file), 'r+');
        await fileDescriptor.truncate();
        await fs.writeFile(fileDescriptor, JSON.stringify(data));
        return true;
    } catch (error) {
        return false;
    } finally {
        if (fileDescriptor) {
            fileDescriptor.close();
        }
    }
}

lib.delete = async (dir, file) => {
    try {
        await fs.unlink(fullPath(dir, file));
        return true;
    } catch (error) {
        return false;
    }
}

lib.list = async (dir) => {
    const fullFolderPath = lib.baseDir + dir;
    try {
        const files = await fs.readdir(fullFolderPath);
        const trimmedFileNames = [];
        for (const file of files) {
            trimmedFileNames.push(file.split('.').slice(0, -1).join('.'));
        }
        return trimmedFileNames;
    } catch (error) {
        return error;
    }
}

lib.readHTML = async (file) => {
    try {
        // turime nurodyti is kur imame faila. Cia perskaitome index.html faila ir graziname i server.js  res.end(html);
        return await fs.readFile(`${lib.pagesDir + file}.html`, 'utf-8');
    } catch (error) {
        return '';
    }
}

// turi perskaityti is templatesDir, nurodysim tik failo pavadinima ir jis prides .html galune ir nurodys tinkama enkodinima utf-8
// gausime rezultata. Kadangi yra async funkcija, home-page.js t.b await
lib.readTemplateHTML = async (file) => {
    try {
        return await fs.readFile(`${lib.templatesDir + file}.html`, 'utf-8');
    } catch (error) {
        return '';
    }
}

lib.readStaticTextFile = async (file) => {
    try {
        // turime nurodyti is kur imame faila. .css nurodyti nereikia preisingai nei readHTML. naudojam publicDir ir apsirasome virsuje 
        // po tai kai padarom galime perskaityti statinius (public) failus
        return await fs.readFile(`${lib.publicDir + file}`, 'utf-8');
    } catch (error) {
        return '';
    }
}

// cia bus identiskas kaip su readStaticTextFile skiriasi tik kad nera utf-8 (stringo)
lib.readStaticBinaryFile = async (file) => {
    try {
        return await fs.readFile(`${lib.publicDir + file}`);
    } catch (error) {
        return '';
    }
}

module.exports = lib;