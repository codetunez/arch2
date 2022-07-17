const shortid = require('shortid');
const morgan = require('morgan');

const port = 3001;

const data = require('./data');
const express = require('express');
const app = express();
app.use(express.json());
app.use(morgan('tiny'));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,App-User,App-User-Session");
    res.setHeader("Access-Control-Allow-Credentials", false);
    next();
});

app.get('/api/site/:siteId', (req, res) => {
    let s = data.sites.find((x) => x.id === req.params.siteId);
    res.send(s).end();
})

app.post('/api/site/:siteId', (req, res) => {
    let s = data.sites.findIndex((x) => x.id === req.params.siteId);
    if (s > -1) {
        data.sites[s] = req.body;
        res.send({ sites: data.sites, site: data.sites[s] }).end();
        return;
    }
    res.end();
})

app.get('/api/page/:siteId/:pageId', (req, res) => {
    let s = data.sites.find((x) => x.id === req.params.siteId);
    let p = s.pages.find((x) => x.id === req.params.pageId);
    res.send(p).end();
})

app.post('/api/page/new', (req, res) => {
    const { siteId } = req.body;
    const i = data.sites.findIndex((x) => x.id === siteId);
    const id = shortid.generate().replace(/-/g, "");
    data.sites[i].pages.push({
        "id": id,
        "title": "New Page",
        "markup": "",
        "url": id
    })
    res.send({ sites: data.sites }).end();
})

app.post('/api/page/:siteId/:pageId', (req, res) => {
    let s = data.sites.findIndex((x) => x.id === req.params.siteId);
    if (s > -1) {
        let p = data.sites[s].pages.findIndex((x) => x.id === req.params.pageId);
        if (p > -1) {
            data.sites[s].pages[p] = req.body;
            res.send({ sites: data.sites, page: data.sites[s].pages[p] }).end();
            return;
        }
    }
    res.end();
})

app.post('/api/content/new', (req, res) => {
    data.content.push({
        "id": shortid.generate().replace(/-/g, ""),
        "markup": "",
    })
    res.send({ sites: data.sites }).end();
})

app.get('/api/content/:contentId', (req, res) => {
    let c = data.content.find((x) => x.id === req.params.contentId);
    res.send(c).end();
})

app.post('/api/content/:contentId', (req, res) => {
    let c = data.content.findIndex((x) => x.id === req.params.contentId);
    if (c > -1) {
        data.content[c] = req.body;
        res.send({ sites: data.sites, content: data.content[c] }).end();
        return;
    }
    res.end();
})

app.get('/api/sites', (req, res) => {
    res.send(data.sites);
})

app.get('/api/content', (req, res) => {
    res.send(data.content).end();
});

app.listen(port, () => {
    console.log(`Middle tier listening on port ${port}`);
});