// CRUD
// César Becerra Ramírez
// 1744338

const { Client } = require('pg');
var express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
app.use(express.urlencoded({ extended: true }))
const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });
app.use(express.static(path.join(__dirname, '/')));
client.connect();


app.post('/c',
 (req, res) => {
        client.query('INSERT INTO pacientes(id, nombre, numid, apellido) VALUES(DEFAULT, $1, $2, $3)', [
         req.body.n, req.body.nm, req.body.a],
            (e, r) => { res.send('OK'); });
    }
);

app.post('/r',
 (req, res) => {
        client.query('SELECT * FROM pacientes WHERE id = $1', [req.body.i],
            (e, r) => { res.send(r.rows[0]); });
    }
);

app.post('/u',
 (req, res) => {
        client.query('UPDATE pacientes SET nombre = $1, numid = $2, apellido = $3 WHERE id = $4', [req.body.n, req.body.nm,req.body.a,req.body.i],
            (e, r) => { res.send('OK'); });
    }
);

app.post('/d',
 (req, res) => {
        client.query('DELETE FROM pacientes WHERE id = $1', [req.body.i],
            (e, r) => { res.send('OK'); });
    }
);

const PORT = 3000;
app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));