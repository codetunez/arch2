const axios = require('axios');
const morgan = require('morgan');

const library = require('../library');

const port = 3002;
const express = require('express');
const app = express();
app.use(express.json());
app.use(morgan('tiny'));

// setup data
let sites = {};
let content = {};
let data = {};

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
    // TODO: refresh data in dev 
    // code assumes path starts with a slash and root segment is empty string
    const segments = req.url.split('/');

    // site not found
    if (!sites[segments[1]]) { res.status(404).end(); return; }

    const styles = sites[segments[1]].stylesheet ? `<style>${sites[segments[1]].stylesheet}</style>` : "";
    const page = sites[segments[1]].pages.find((x) => x.url === (segments[2] || ""));

    // page not found
    if (!page) { res.status(404).end(); return; }

    const eng = sites[segments[1]].engine;

    // resolve all the content fragments, resolve server controls, transform the markup, render the html
    let markup = page.markup.join("\n");
    markup = library.content.resolve(markup, content);
    markup = library.content.resolveServer(markup, data);
    markup = library.engines[eng](markup);
    markup = library.templates[eng](page.title, markup, styles);

    res.type('html');
    res.send(markup).end();
});

// start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// this is async to express starting
function loadData() {
    let sitesRes = null;
    let contentRes = null
    axios("http://localhost:3001/api/sites")
        .then((res) => {
            sitesRes = res.data;
            return axios("http://localhost:3001/api/content")
        })
        .then((res) => {
            contentRes = res.data;
            return axios("http://localhost:3001/api/data")
        })
        .then((res) => {
            // because the is an associative array, we have to re-init before re-creating to clear deleted enteries
            sites = {};
            content = {};
            data = {};
            sitesRes.map((ele) => { sites[ele.id] = ele; })
            contentRes.map((ele) => { content[ele.id] = ele; })
            res.data.map((ele) => { data[ele.id] = ele; })
            console.log(`Data load: sites:${sitesRes.length} content:${contentRes.length} data:${res.data.length}`);
        })
}