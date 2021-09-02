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

    let sql = '';
    let rows = [];

    // perskaitom ka turim is pradziu
    sql = 'SELECT * \
    FROM `cars` \
    WHERE `id` = 3';
    [rows] = await connection.execute(sql);
    console.log(rows);

    // irasom nauja masina
    sql = 'INSERT INTO `cars` \
        (`id`, `marke`, `modelis`, `color`, `engine`, `doors`) \
        VALUES (8, "Audi", "100", "grey", "2.2", "3")';
    [rows] = await connection.execute(sql);
    console.log(rows);

    // atnaujiname
    sql = 'UPDATE `cars` \
        SET `marke` = "Audi", \
            `modelis` = "80", \
            `color` = "green" \
        WHERE `cars`.`id` = 4';
    [rows] = await connection.execute(sql);
    console.log(rows);

    // perskaitom ka turim po atnaujinimo
    sql = 'SELECT * \
    FROM `cars` \
    WHERE `id` = 4';
    [rows] = await connection.execute(sql);
    console.log(rows);

    // istrinam
    sql = 'DELETE FROM `cars` \
    WHERE `id` = 1';
    [rows] = await connection.execute(sql);
    console.log(rows);
    server.init(connection);
}

app.init();

module.exports = app;