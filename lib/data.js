const fs = require('fs').promises;
const path = require('path');

const lib = {}

lib.baseDir = path.join(__dirname, '../.data/');
lib.pagesDir = path.join(__dirname, '../pages/');

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
        return await fs.readFile(`${lib.pagesDir + file}.html`, 'utf-8');
    } catch (error) {
        return '';
    }
}

module.exports = lib;