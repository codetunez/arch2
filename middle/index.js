const port = 3001;

const data = require('./data');
const express = require('express');
const app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,App-User,App-User-Session");
    res.setHeader("Access-Control-Allow-Credentials", false);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/sites', (req, res) => {
    res.send(data.sites);
})

app.post('/api/sites', (req, res) => {
    data.sites = req.body;
});

app.get('/api/content', (req, res) => {
    res.send(data.content);
});

app.post('/api/content', (req, res) => {
    data.content = req.body;
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});