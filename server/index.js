const axios = require('axios');
const library = require('../library');

const port = 3002;
const express = require('express');
const app = express();
app.use(express.json());

// setup data
const sites = {};
loadSites();

// not production code
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,App-User,App-User-Session");
    res.setHeader("Access-Control-Allow-Credentials", false);
    next();
});

// this is the signal that the content has changed
app.post('/api/reload', (req, res) => {
    loadSites();
    res.end();
});

// the browser will always request for this. So just send a status back
app.get('/favicon.ico', (req, res) => res.status(204));

// this will match any url. this allows us to handle the page request
app.get('*', (req, res) => {

    const segments = req.url.split('/');
    // code assumes path starts with a slash and root page is empty string
    const page = sites[segments[1]].pages.find((x) => x.url === (segments[2] || ""));

    if (!page) { res.status(404).end(); return; }

    const render = library.templates[sites[segments[1]].engine](page.markup);
    res.type('html');
    res.send(render).end();
});

// start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// this is async to express starting
function loadSites() {
    axios("http://localhost:3001/api/sites")
        .then((res) => {
            res.data.map((ele) => {
                sites[ele.id] = ele;
            })
        })
}

