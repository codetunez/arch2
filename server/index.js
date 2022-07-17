const axios = require('axios');
const morgan = require('morgan');

const library = require('../library');

const port = 3002;
const express = require('express');
const app = express();
app.use(express.json());
app.use(morgan('tiny'));

// setup data
const sites = {};
const content = {};
loadData();

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
    loadData();
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

    const eng = sites[segments[1]].engine;

    // resolve all the content, transform the markup, render the html
    const markup = library.content.resolve(page.markup, content);
    const contentMarkup = library.engines[eng](markup);
    const render = library.templates[eng](contentMarkup);

    res.type('html');
    res.send(render).end();
});

// start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// this is async to express starting
function loadData() {
    let sitesRes = null;
    axios("http://localhost:3001/api/sites")
        .then((res) => {
            sitesRes = res.data;
            return axios("http://localhost:3001/api/content")
        })
        .then((res) => {
            console.log("Data loading");
            sitesRes.map((ele) => { sites[ele.id] = ele; })
            res.data.map((ele) => { content[ele.id] = ele; })
        })
}

