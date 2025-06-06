const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

const createTable = `
  CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )
`;
connection.query(createTable);

app.get('/', (req, res) => {
    const name = `User${Math.floor(Math.random() * 1000)}`;
    connection.query(`INSERT INTO people(name) VALUES(?)`, [name]);

    connection.query(`SELECT * FROM people`, (err, results) => {
        if (err) throw err;

        let namesList = results.map(person => `<li>${person.name}</li>`).join('');
        res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
