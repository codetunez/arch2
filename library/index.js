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

        $("section").find("grid").each(function (i, grids) {
            $(this).find("row").each(function (i, rows) {
                $(this).find("cell").each(function (i, cell) {
                    $(this).replaceWith(`<div class="col">${$(cell).html()}</div>`);
                });
            })
        })

        $("button").each(function (i, ele) {
            // a very basic check. this should inspect for specific attributes
            if (!$(this).attr("class")) {
                $(this).replaceWith(`<button class="btn btn-primary">${$(ele).text()}</button>`)
            }
        })

        $("input").each(function (i, ele) {
            $(this).addClass("form-control");
        })

        $("row").replaceWith(`<div class="row">${$("row").html()}</div>`);
        $("grid").replaceWith(`<div class="container">${$("grid").html()}</div>`);
        $("section").replaceWith(`<div class="section">${$("section").html()}</div>`);

        return $.html();
    },
    "tailwind": (markup) => {
        let $ = cheerio.load(markup, null, false);
        return $.html();
    },
    "skeleton": (markup) => {
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