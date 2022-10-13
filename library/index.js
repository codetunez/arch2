const cheerio = require('cheerio');

module.exports.list = {
    "engines": ["bootstrap3","bootstrap5", "skeleton", "tailwind","html5"],
    "forms": ["simpleform", "default"]
};

module.exports.content = {
    "resolve": (markup, contentFragments) => {
        let $ = cheerio.load(markup, { xmlMode: true }, false);
        $("Content").each(function (i, ele) {
            const id = $(this).attr("id");
            const c = contentFragments[id];
            if (c) {
                $(this).replaceWith(c.markup);
            } else {
                $(this).replaceWith(`<!-- Unresolved content missing: ${id} -->`)
            }
        })
        return $.html({ xmlMode: false });
    },
    "resolveServer": (markup, data) => {
        let $ = cheerio.load(markup, { xmlMode: true }, false);
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

        $("Date").each(function (i, ele) {
            const locale = $(this).attr("locale");
            $(this).replaceWith(new Date().toLocaleString(locale));
        })

        return $.html({ xmlMode: false });
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
        let $ = cheerio.load(markup, { xmlMode: true }, false);
        
        // TODO: what if multiple navs in header 
        $(`header nav`).addClass("navbar navbar-default")
        $(`header nav ul`)
            .addClass("nav navbar-nav navbar-right")
            .wrap($(`<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"></div>`))
        $(`header nav a[data-pp-element="brand"]`)
            .addClass("navbar-brand")
        $(`header nav a[data-pp-element="brand"]`)
            .wrap($(`<div class="navbar-header"></div`))
        $(`<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            </button>`)
            .insertBefore($(`header nav div a[data-pp-element="brand"]`))
        $(`header nav`).wrapInner($(`<div class="container-fluid"></div>`))


        $(`div[data-pp-element="grid"]`).addClass("container")
        $(`div[data-pp-element="row"]`).each((_,row) => {
            const cols = $(row).find(`div[data-pp-element="column"]`)
            const colspan = Math.floor(12 / cols.length) > 0 ? Math.floor(12 / cols.length) : 1 
            cols.addClass(`col-md-${colspan}`)
        })
        $("button").addClass("btn btn-primary")
        // TODO: form groups, help blocks ?
        $("input").addClass("form-control")

        return $.html({ xmlMode: false });
    },
    "bootstrap5": (markup) => {
        let $ = cheerio.load(markup, { xmlMode: true }, false);

        $(`div[data-pp-element="grid"]`).addClass("container")
        $(`div[data-pp-element="row"]`).addClass("row")
        $(`div[data-pp-element="column"]`).addClass("column")
        $("button").addClass("btn btn-primary")
        // TODO: form groups, help blocks ?
        $("input").addClass("form-control")

        return $.html({ xmlMode: false });
    },
    "skeleton": (markup) => {

        const gridMap = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

        let $ = cheerio.load(markup, { xmlMode: true }, false);

        // $(`div[data-pp-element="grid"]`).find(`div[data-pp-element="row"]`)).each(function (i, rows) {
        //     const columns = $(this).find(`div[data-pp-element="column"]`);
        //     const gridcolumn = columns.length === 1 ? gridMap[gridMap.length - 1] : gridMap[Math.floor(12 / columns.length) - 1];
        //     columns.each(function (i, column) {
        //         $(this).replaceWith(`<div class="${gridcolumn} columns">${$(column).html()}</div>`);
        //     });
        // })

        // $("heading").each(function (i, ele) {
        //     const headingType = $(this).attr("as").toLowerCase();
        //     const textOrHtml = $(this).attr("text") || $(ele).html();
        //     $(this).replaceWith(`<${headingType}>${textOrHtml}</${headingType}>`) 
        // });

        // $("button").each(function (i, ele) {
        //     const textOrHtml = $(this).attr("text") || $(ele).html();
        //     $(this).replaceWith(`
        //         <button class="button-primary">
        //             ${textOrHtml}
        //         </button>
        //     `);
        // });
        
        // $("Form").find("group").each(function (i, ele) { $(this).replaceWith($(ele).html()); })
        // $("row").each(function (i, ele) { $(this).replaceWith(`<div class="row">${$(ele).html()}</div>`); })
        // $(`div[data-pp-element="grid"]`).each(function (i, ele) { $(this).replaceWith(`<div class="container">${$(ele).html()}</div>`); })
        // $("section").each(function (i, ele) { $(this).replaceWith(`<div class="section">${$(ele).html()}</div>`); })

        return $.html({ xmlMode: false });
    },
    "tailwind": (markup) => {

        const gridMap = ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-7', 'grid-cols-8', 'grid-cols-9', 'grid-cols-10', 'grid-cols-11', 'grid-cols-1'];

        // let $ = cheerio.load(markup, { xmlMode: true }, false);


        // $("heading").each(function (i, ele) {
        //     const headingType = $(this).attr("as").toLowerCase();
        //     const textOrHtml = $(this).attr("text") || $(ele).html();
        //     $(this).replaceWith(`<${headingType}>${textOrHtml}</${headingType}>`) 
        // });

        // $(`div[data-pp-element="grid"]`).find(`div[data-pp-element="row"]`)).each(function (i, rows) {
        //     const columns = $(this).find(`div[data-pp-element="column"]`);
        //     const gridcolumn = gridMap[columns.length - 1];
        //     $(this).replaceWith(`<div class="grid ${gridcolumn} gap-4">${$(rows).html()}</div>`);
        // })

        // $("button").each(function (i, ele) {
        //     const textOrHtml = $(this).attr("text") || $(ele).html();
        //     $(this).replaceWith(`
        //         <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        //             ${textOrHtml}
        //         </button>
        //     `);
        // });
        
        // $("Form").find("group").each(function (i, ele) { $(this).replaceWith(`<div>${$(ele).html()}</div>`); })
        // $("column").each(function (i, ele) { $(this).replaceWith(`<div>${$(ele).html()}</div>`); })
        // $(`div[data-pp-element="grid"]`).each(function (i, ele) { $(this).replaceWith(`<div class="container">${$(ele).html()}</div>`); })
        // $("section").each(function (i, ele) { $(this).replaceWith(`<div class="section">${$(ele).html()}</div>`); })

        // $("label").each(function (i, ele) { $(this).addClass("block text-gray-700 text-sm font-bold mb-2"); });
        // $("input").each(function (i, ele) { $(this).addClass("appearance-none border rounded w-full py-2 px-3"); });

        return $.html({ xmlMode: false });
    },
    "html5": (markup) => {
        return markup
    }
}

module.exports.templates = {
    "html5":(title,content,styles) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>${title || ""} (HTML5)</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="description" content="" />
            ${styles || ""}
        </head>
        <body>
        ${content || ""}
        </body>
    </html>        
    `,
    "bootstrap3": (title, content, styles) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${title || ""} (Bootstrap 3)</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        ${styles || ""}
    </head>
    <body>
    ${content || ""}
    </body>
</html>    
    `,
    "bootstrap5": (title, content, styles) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${title || ""} (Bootstrap 5)</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        ${styles || ""}
    </head>
    <body>
    ${content || ""}
    </body>
</html>    
    `,
    "tailwind": (title, content, styles) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${title || ""} (Tailwind)</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />
        <!-- Tailwind reorders the CSS hence styles not in head -->
    </head>
    
    <body>
    ${styles || ""}
    ${content || ""}
    </body>
</html>    
    `,
    "skeleton": (title, content, styles) => `
<!DOCTYPE html>
<html lang="en">
    <head>
    <title>${title || ""} (Skeleton)</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" integrity="sha512-EZLkOqwILORob+p0BXZc+Vm3RgJBOe1Iq/0fiI7r/wJgzOFZMlsqTa29UEl6v6U6gsV4uIpsNZoV32YZqrCRCQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        ${styles || ""}        
    </head>
    <body>
    ${content || ""}
    </body>
</html>    
    `
}