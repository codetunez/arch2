const cheerio = require('cheerio');

module.exports.list = {
    "engines": ["bootstrap3","bootstrap5", "materialize", "skeleton","none"],
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

        // semantic html5 mappings
        $("button").addClass("btn btn-default")
        $("input").addClass("form-control")

        // elements
        $(`nav[data-pp-element="site-nav"]`).addClass("navbar navbar-default")
        $(`[data-pp-element="site-links"]`).addClass("nav navbar-nav navbar-collapse collapse").attr("id","navbar-collapse") 
        $(`[data-pp-element="site-brand"]`).addClass("navbar-header navbar-brand")
        $(`[data-pp-element="site-burger"]`)
            .removeClass("btn")
            .removeClass("btn-default")
            .addClass("navbar-toggle collapsed")
            .attr("data-toggle","collapse")
            .attr("data-target","#navbar-collapse")
            .append(`<span class="sr-only">Toggle navigation</span>`)
            .append(`<span class="icon-bar"></span>`)
            .append(`<span class="icon-bar"></span>`)
            .append(`<span class="icon-bar"></span>`)
            .appendTo($(`[data-pp-element="site-brand"]`))

        // layout
        $(`[data-pp-layout="grid"]`).addClass("container")
        $(`[data-pp-layout="container"]`).addClass("container")
        $(`[data-pp-layout="row"]`).each((_,row) => {
            $(row).addClass("row")
            const cols = $(row).find(`[data-pp-layout="column"]`)
            const colspan = Math.floor(12 / cols.length) > 0 ? Math.floor(12 / cols.length) : 1 
            cols.addClass(`col-md-${colspan}`)
        })
        $(`[data-pp-layout="container"][data-pp-style="fluid"]`).removeClass("container").addClass("container-fluid")

        // styling
        $(`nav [data-pp-style="justify-end"]`).addClass("navbar-right")
        $(`nav [data-pp-style="justify-start"]`).addClass("navbar-left")
        $(`button[data-pp-style="primary"]`).removeClass("btn-default").addClass("btn-primary")
        $(`[data-pp-style="float-left"]`).addClass("pull-left")
        $(`[data-pp-style="float-right"]`).addClass("pull-right")
        $(`[data-pp-style="align-center"]`).addClass("text-center")
        $(`[data-pp-style="align-right"]`).addClass("text-right")
        $(`[data-pp-style="align-left"]`).addClass("text-left")

        return $.html({ xmlMode: false });
    },
    "bootstrap5": (markup) => {
        let $ = cheerio.load(markup, { xmlMode: true }, false);

        // semantic html5 mappings
        $("button").addClass("btn btn-default")
        $("input").addClass("form-control")

        // elements
        $(`nav[data-pp-element="site-nav"]`).addClass("navbar navbar-expand-lg")
        $(`[data-pp-element="site-links"]`).addClass("navbar-nav collapse navbar-collapse").attr("id","navbar-collapse")
        $(`[data-pp-element="site-links"] li`).addClass("nav-item")
        $(`[data-pp-element="site-links"] li a`).addClass("nav-link")
        $(`[data-pp-element="site-brand"]`).addClass("navbar-brand")
        $(`[data-pp-element="site-burger"]`)
            .removeClass("btn")
            .removeClass("btn-default")
            .addClass("navbar-toggler")
            .attr("data-bs-toggle","collapse")
            .attr("data-bs-target","#navbar-collapse")
            .append(`<span class="navbar-toggler-icon"></span>`)

        // layout
        $(`[data-pp-layout="grid"]`).addClass("container")
        $(`[data-pp-layout="container"]`).addClass("container")
        $(`[data-pp-layout="row"]`).addClass("row") 
        $(`[data-pp-layout="column"]`).addClass("col") 
        $(`[data-pp-layout="container"][data-pp-style="fluid"]`).removeClass("container").addClass("container-fluid")

        // styling
        $(`[data-pp-style="justify-start"]`).addClass("justify-content-start")
        $(`[data-pp-style="justify-end"]`).addClass("justify-content-end")
        $(`button[data-pp-style="primary"]`).removeClass("btn-default").addClass("btn-primary")
        $(`[data-pp-style="float-left"]`).addClass("pull-left")
        $(`[data-pp-style="float-right"]`).addClass("pull-right")
        $(`nav[data-pp-style="light"]`).addClass("nav-light")
        $(`[data-pp-style="light"]`).addClass("bg-light")
        $(`[data-pp-style="align-center"]`).addClass("text-center")
        $(`[data-pp-style="align-right"]`).addClass("text-right")
        $(`[data-pp-style="align-left"]`).addClass("text-left")
    
        return $.html({ xmlMode: false });
    },
    "materialize": (markup) => {
        let $ = cheerio.load(markup, { xmlMode: true }, false);

        // semantic html5 mappings
        $("button").addClass("waves-effect waves-light btn")
        $("footer").addClass("page-footer")

        
        // layout
        $(`[data-pp-layout="grid"]`).addClass("container")
        $(`[data-pp-layout="container"]`).addClass("container")
        $(`[data-pp-layout="row"]`).each((_,row) => {
            $(row).addClass("row")
            const cols = $(row).find(`[data-pp-layout="column"]`)
            const colspan = Math.floor(12 / cols.length) > 0 ? Math.floor(12 / cols.length) : 1
            $(cols).addClass(`col s${colspan}`)
        })
       
        // elements
        $(`nav[data-pp-element="site-nav"] div`).removeClass("container").addClass("navbar-wrapper")
        $(`[data-pp-element="site-links"]`).addClass("hide-on-med-and-down").attr("id","nav-mobile")
        $(`[data-pp-element="site-brand"]`).addClass("brand-logo")
        $(`[data-pp-element="site-burger"]`).addClass("hide")

        // styling
        $(`[data-pp-style="justify-start"]`).addClass("left")
        $(`[data-pp-style="justify-end"]`).addClass("right")
        $(`[data-pp-style="float-left"]`).addClass("left")
        $(`[data-pp-style="float-right"]`).addClass("right")
        $(`[data-pp-style="align-center"]`).addClass("center-align")
        $(`[data-pp-style="align-right"]`).addClass("left-align")
        $(`[data-pp-style="align-left"]`).addClass("right-align")
    
        return $.html({ xmlMode: false });
    },
    "bulma": (markup) => {
        let $ = cheerio.load(markup, { xmlMode: true }, false);

        // semantic html5 mappings
        $("button").addClass("button")
        $("input").addClass("input")
        $("section").addClass("section")
        $("footer").addClass("footer")
        $("h1").addClass("title is-1")
        $("h2").addClass("title is-2")
        $("h3").addClass("title is-3")
        $("h4").addClass("title is-4")
        $("h5").addClass("title is-5")
        $("h6").addClass("title is-6")
        $("p").addClass("content")

        
        // layout
        $(`[data-pp-layout="grid"]`).addClass("container")
        $(`[data-pp-layout="container"]`).addClass("container")
        $(`div[data-pp-layout="row"]`).addClass("columns")
        $(`div[data-pp-layout="column"]`).addClass("column")
       
        // elements
        $(`nav[data-pp-element="site-nav"]`).addClass("navbar")
        $(`[data-pp-element="site-links"]`).addClass("navbar-menu").attr("id","navbarBasicExample")
        $(`[data-pp-element="site-brand"]`).addClass("navbar-brand")
        $(`[data-pp-element="site-burger"]`).addClass("navbar-burger").attr("data-target","navbarBasicExample")
        $(`[data-pp-element="site-links"] li a`).addClass("navbar-item")

        // styling
        $(`button[data-pp-style="primary"]`).addClass("is-primary")
        $(`nav [data-pp-style="justify-start"]`).addClass("navbar-start")
        $(`nav [data-pp-style="justify-end"]`).addClass("navbar-end")
        
        $(`[data-pp-style="float-left"]`).addClass("is-pulled-left")
        $(`[data-pp-style="float-right"]`).addClass("is-pulled-right")
        $(`[data-pp-style="align-center"]`).addClass("has-text-centered")
        $(`[data-pp-style="align-right"]`).addClass("has-text-left")
        $(`[data-pp-style="align-left"]`).addClass("has-text-right")
    
        return $.html({ xmlMode: false });
    },
    "skeleton": (markup) => {

        const gridMap = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

        let $ = cheerio.load(markup, { xmlMode: true }, false);

        // layout
        $(`[data-pp-layout="grid"]`).addClass("container")
        $(`[data-pp-layout="container"]`).addClass("container")
        $(`div[data-pp-layout="row"]`).each((_,row) => {
            $(row).addClass("row")
            const cols = $(row).find(`div[data-pp-layout="column"]`)
            const colspan = Math.floor(12 / cols.length) > 0 ? Math.floor(12 / cols.length) : 1 
            cols.addClass(`${gridMap[colspan-1]} ${colspan === 1?"column":"columns"}`)
        })
        
        // styling
        $(`button[data-pp-style="primary"]`).addClass("button-primary")
        $(`[data-pp-style="float-left"]`).addClass("u-pull-left")
        $(`[data-pp-style="float-right"]`).addClass("u-pull-right")

        return $.html({ xmlMode: false });
    },
    "none": (markup) => {
        return markup
    }
}

module.exports.templates = {
    "none":(title,content,styles) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>${title || ""}</title>
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
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
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
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
        ${styles || ""}
    </head>
    <body>
    ${content || ""}
    </body>
</html>    
    `,
    "materialize": (title, content, styles) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${title || ""} (Materialize)</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        ${styles || ""}
    </head>
    <body>
    ${content || ""}
    </body>
</html>    
    `,
    "bulma": (title, content, styles) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${title || ""} (Materialize)</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma-rtl.min.css" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" crossorigin="anonymous"></script>
        ${styles || ""}
    </head>
    <body>
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
