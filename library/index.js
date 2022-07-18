const cheerio = require('cheerio');

module.exports.content = {
    "resolve": (markup, data) => {
        let $ = cheerio.load(markup, null, false);
        $("content").each(function (i, ele) {
            const id = $(this).attr("id");
            const c = data[id];
            if (c) { $(this).replaceWith(c.markup); } else { $(this).replaceWith(`<!-- Unresolved content missing: ${id} -->`) }
        })
        return $.html();
    }
}

module.exports.engines = {
    "bootstrap3": (markup) => {
        let $ = cheerio.load(markup, null, false);

        $("grid").find("row").each(function (i, rows) {
            $(this).find("cell").each(function (i, cell) {
                $(this).replaceWith(`<div class="col">${$(cell).html()}</div>`);
            });
        })

        $("button").each(function (i, ele) { $(this).addClass("btn btn-primary"); });
        $("input").each(function (i, ele) { $(this).addClass("form-control"); });
        $("row").each(function (i, ele) { $(this).replaceWith(`<div class="row">${$(ele).html()}</div>`); })
        $("grid").each(function (i, ele) { $(this).replaceWith(`<div class="container">${$(ele).html()}</div>`); })
        $("section").each(function (i, ele) { $(this).replaceWith(`<div class="section">${$(ele).html()}</div>`); })

        return $.html();
    },
    "skeleton": (markup) => {

        const gridMap = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

        let $ = cheerio.load(markup, null, false);

        $("grid").find("row").each(function (i, rows) {
            const cells = $(this).find("cell");
            const gridCol = cells.length === 1 ? gridMap[gridMap.length - 1] : gridMap[Math.floor(12 / cells.length) - 1];
            cells.each(function (i, cell) {
                $(this).replaceWith(`<div class="${gridCol} columns">${$(cell).html()}</div>`);
            });
        })

        $("button").each(function (i, ele) { $(this).addClass("button-primary"); })
        $("row").each(function (i, ele) { $(this).replaceWith(`<div class="row">${$(ele).html()}</div>`); })
        $("grid").each(function (i, ele) { $(this).replaceWith(`<div class="container">${$(ele).html()}</div>`); })
        $("section").each(function (i, ele) { $(this).replaceWith(`<div class="section">${$(ele).html()}</div>`); })

        return $.html();
    },
    "tailwind": (markup) => {
        let $ = cheerio.load(markup, null, false);
        return $.html();
    },
}

module.exports.templates = {
    "bootstrap3": (content) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Bootstrap</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    </head>
    <body>
    ${content}
    </body>
</html>    
    `,
    "tailwind": (content) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Tailwind</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <script src="https://cdn.tailwindcss.com"></script>
        </head>
    <body>
    ${content}
    </body>
</html>    
    `,
    "skeleton": (content) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Skeleton</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" integrity="sha512-EZLkOqwILORob+p0BXZc+Vm3RgJBOe1Iq/0fiI7r/wJgzOFZMlsqTa29UEl6v6U6gsV4uIpsNZoV32YZqrCRCQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </head>
    <body>
    ${content}
    </body>
</html>    
    `
}