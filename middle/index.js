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

app.get('/api/sites', (req, res) => {
    res.send(data.sites);
})

app.get('/api/site/:siteId/:pageId', (req, res) => {
    let s = data.sites.find((x) => x.id === req.params.siteId);
    let p = s.pages.find((x) => x.id === req.params.pageId);
    res.send(p).end();
})

app.post('/api/site/:siteId/:pageId', (req, res) => {
    let s = data.sites.findIndex((x) => x.id === req.params.siteId);
    if (s > -1) {
        let p = data.sites[s].pages.findIndex((x) => x.id === req.params.pageId);
        if (p > -1) {
            data.sites[s].pages[p] = req.body;
            res.send(data.sites[s].pages[p]).end();
            return;
        }
    }
    res.end();
})

app.post('/api/sites', (req, res) => {
    data.sites = req.body;
});

app.get('/api/content', (req, res) => {
    res.send(data.content).end();
});

app.post('/api/content', (req, res) => {
    data.content = req.body;
});

app.listen(port, () => {
    console.log(`Middle tier listening on port ${port}`);
});