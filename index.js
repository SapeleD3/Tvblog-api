const express = require('express')
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const upload = require('./controllers/upload');
const feed = require('./controllers/feed')

const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '1234',
        database: 'blogtv'
        // connectionString: process.env.DATABASE_URL,
        // ssl: true
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors())



app.get('/', (req, res) => {
    res.send('Hello World')
})
app.post('/register', (req, res) => {register.handleRegister(req, res, postgres, bcrypt)})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, postgres, bcrypt)})
app.put('/upload', (req, res) => {upload.handleUpload(req, res, postgres)})
app.get('/feed', (req, res) => {feed.handleFeed(req, res, postgres)})

const PORT = 6536

app.listen(PORT, ()=> {
    console.log(`App is Running on port ${PORT}`)
})