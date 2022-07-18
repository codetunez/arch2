const cheerio = require('cheerio');

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

    // code assumes path starts with a slash and root segment is empty string
    const segments = req.url.split('/');

    // site not found
    if (!sites[segments[1]]) { res.status(404).end(); return; }

    const page = sites[segments[1]].pages.find((x) => x.url === (segments[2] || ""));

    // page not found
    if (!page) { res.status(404).end(); return; }

    const eng = sites[segments[1]].engine;

    // resolve all the content, transform the markup, render the html
    const markup = library.content.resolve(page.markup, content);
    const serverMarkup = resolveServerContent(markup, data); // Should this be in library?   
    const contentMarkup = library.engines[eng](serverMarkup);
    const render = library.templates[eng](page.title, contentMarkup);

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

// TODO: this needs to be thought out. Ideally cheerio is ideal for library only
function resolveServerContent(markup, data) {

    let $ = cheerio.load(markup, null, false);
    $("pp\\:form").each(function (i, ele) {
        const id = $(this).attr("data");
        const ux = $(this).attr("ux");

        const c = data[id];
        const u = ServerForms[ux] || ServerForms["default"];
        const markup = u(c);

        $(this).replaceWith(markup);
    })

    $("pp\\:day").each(function (i, ele) {
        $(this).replaceWith(new Date().toString());
    })

    return $.html();
}

// TODO: how to localize
// TODO: the extra div around the form button is not required but will make the button go to a new line in all frameworks
const ServerForms = {
    "simpleform": (data) => {
        const fields = data.fields.map((ele) => {
            return `<group><label>${ele.display}</label><input type="${ele.type === "number" ? "number" : "text"}" name="${ele.name}"></input></group>`
        })
        return `<form>${fields.join('')}<div><button type="submit">Submit</button></div></form>`
    },
    "default": () => {
        const fields = data.fields.map((ele) => {
            return `<div><label>${ele.display}</label><input type="${ele.type === "number" ? "number" : "text"}" name="${ele.name}"></input></div`
        })
        return `<form>${fields.join('')}<div><button type="submit">Submit</button></div></form>`
    }
}
