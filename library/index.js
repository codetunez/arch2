const cheerio = require('cheerio');

module.exports.list = {
    "engines": ["bootstrap3", "skeleton", "tailwind"],
    "forms": ["simpleform", "default"]
};

module.exports.content = {
    "resolve": (markup, contentFragments) => {
        let $ = cheerio.load(markup, null, false);
        $("content").each(function (i, ele) {
            const id = $(this).attr("id");
            const c = contentFragments[id];
            if (c) {
                $(this).replaceWith(c.markup);
            } else {
                $(this).replaceWith(`<!-- Unresolved content missing: ${id} -->`)
            }
        })
        return $.html();
    },
    "resolveServer": (markup, data) => {
        let $ = cheerio.load(markup, null, false);
        $("pp\\:form").each(function (i, ele) {
            const id = $(this).attr("data");
            const ux = $(this).attr("ux");
            const d = data[id];
            if (d) {
                const u = module.exports.serverForms[ux] || module.exports.serverForms["default"];
                const markup = u(d);
                $(this).replaceWith(markup);
            } else {
                $(this).replaceWith(`<!-- Unresolved data missing: ${id} -->`)
            }
        })

        $("pp\\:day").each(function (i, ele) {
            $(this).replaceWith(new Date().toString());
        })

        return $.html();
    }
}

module.exports.serverForms = {
    // TODO: the extra div around the form button is not required but will make the button go to a new line in all frameworks
    "simpleform": (data) => {
        const fields = data.fields.map((ele) => {
            return `<group><label>${ele.display}</label><input type="${ele.type === "number" ? "number" : "text"}" name="${ele.name}"></input></group>`
        })
        return `<form>${fields.join('')}<div><button type="submit">Submit</button></div></form>`
    },
    "default": (data) => {
        const fields = data.fields.map((ele) => {
            return `<div><label>${ele.display}</label><input type="${ele.type === "number" ? "number" : "text"}" name="${ele.name}"></input></div`
        })
        return `<form>${fields.join('')}<div><button type="submit">Submit</button></div></form>`
    }
}

module.exports.engines = {
    "bootstrap3": (markup) => {
        let $ = cheerio.load(markup, null, false);

        $("grid").find("row").each(function (i, rows) {
            $(this).find("column").each(function (i, column) {
                $(this).replaceWith(`<div class="col">${$(column).html()}</div>`);
            });
        })

        $("button").each(function (i, ele) { $(this).addClass("btn btn-primary"); });
        $("input").each(function (i, ele) { $(this).addClass("form-control"); });
        $("form").find("group").each(function (i, ele) { $(this).replaceWith(`<div class="form-group">${$(ele).html()}</div>`); })
        $("row").each(function (i, ele) { $(this).replaceWith(`<div class="row">${$(ele).html()}</div>`); })
        $("grid").each(function (i, ele) { $(this).replaceWith(`<div class="container">${$(ele).html()}</div>`); })
        $("section").each(function (i, ele) { $(this).replaceWith(`<div class="section">${$(ele).html()}</div>`); })

        return $.html();
    },
    "skeleton": (markup) => {

        const gridMap = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

        let $ = cheerio.load(markup, null, false);

        $("grid").find("row").each(function (i, rows) {
            const columns = $(this).find("column");
            const gridColumn = columns.length === 1 ? gridMap[gridMap.length - 1] : gridMap[Math.floor(12 / columns.length) - 1];
            columns.each(function (i, column) {
                $(this).replaceWith(`<div class="${gridColumn} columns">${$(column).html()}</div>`);
            });
        })

        $("button").each(function (i, ele) { $(this).addClass("button-primary"); })
        $("form").find("group").each(function (i, ele) { $(this).replaceWith($(ele).html()); })
        $("row").each(function (i, ele) { $(this).replaceWith(`<div class="row">${$(ele).html()}</div>`); })
        $("grid").each(function (i, ele) { $(this).replaceWith(`<div class="container">${$(ele).html()}</div>`); })
        $("section").each(function (i, ele) { $(this).replaceWith(`<div class="section">${$(ele).html()}</div>`); })

        return $.html();
    },
    "tailwind": (markup) => {

        const gridMap = ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-7', 'grid-cols-8', 'grid-cols-9', 'grid-cols-10', 'grid-cols-11', 'grid-cols-1'];

        let $ = cheerio.load(markup, null, false);

        $("grid").find("row").each(function (i, rows) {
            const columns = $(this).find("column");
            const gridColumn = gridMap[columns.length - 1];
            $(this).replaceWith(`<div class="grid ${gridColumn} gap-4">${$(rows).html()}</div>`);
        })

        $("button").each(function (i, ele) { $(this).addClass("bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"); })
        $("form").find("group").each(function (i, ele) { $(this).replaceWith(`<div>${$(ele).html()}</div>`); })
        $("column").each(function (i, ele) { $(this).replaceWith(`<div>${$(ele).html()}</div>`); })
        $("grid").each(function (i, ele) { $(this).replaceWith(`<div class="container">${$(ele).html()}</div>`); })
        $("section").each(function (i, ele) { $(this).replaceWith(`<div class="section">${$(ele).html()}</div>`); })

        return $.html();
    },
}

module.exports.templates = {
    "bootstrap3": (title, content) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${title} (Bootstrap)</title>
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
    "tailwind": (title, content) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${title} (Tailwind)</title>
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
    "skeleton": (title, content) => `
<!DOCTYPE html>
<html lang="en">
    <head>
    <title>${title} (Skeleton)</title>
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