# Arch II
A PoC for using semantic markup and component frameworks to render a webpage. This codebase is cross platform and does not require any dependencies beyond those installed.

## Pre-reqs
Install LTS version of [NodeJS](https://nodejs.org/en/)

## Services & Libraries
The codebase is made up of 4 parts

- Client - A user experience to author Sites, Pages and Content
- Middle - The data access service
- Library - A library that provides markup transformations for supported CSS frameworks. Designed for browser or server usage
- Server - A web server for server side rendering of webpages and static content

## Installing
Review each of the individual README.md files and follow the instruction. Each service will need to be run in its own console window.

## Startup sequence
This doesn't matter as the system will correct itself. But here is the optimal order.

1. Middle
2. Server
3. Client

### Usage
Once all services are up and running visit http://locahost:3000 in a web browser.

# Authoring
You can use any HTML you desire as the markup. However, if you use any of the following elements (instead of framework DOM structures), the rendered version will utilze the stylesheet "engine" as set at the Site level and the system will transform the HTML into the desire DOM structures. For embedded form controls, remove as many of your custom css classes as possible.

### CSS
Content is assembled prior to serving to the browser. Therefore CSS can be added prior to the DOM which it targets. It can be embbeded directly into the markup or a site level style sheet can be added.

## Composablity support
Use to embedded fragements of reuseable content. Works when referencing server controls.

    <content id="<content id"></content>

## Responsive controls support

### Section
Use to contain any content at 100% width. Has a targetable class attribute.

    <section>
    ...
    </section>

Becomes

    <div class="section"></div>

### Grids
Use to define a 12 column capable grid. Cells will be devided equally or rounded down. Has some targetable class attributes.

    <grid>
      <row>
        <cell></cell>
        <cell></cell>
        <cell></cell>
      </row>
    <grid>

Becomes

    <div class="container">
      <div class="<row classes>">
         <div class="<column classes>"></div>
         <div class="<column classes>"></div>
         <div class="<column classes>"></div>
      </div>
    </div>

## Instrinsic controls support

### Buttons
Use to style any HTML button element.

    <button></button>

### Inputs
Use to style any HTML input element.

    <input></input>

## Server controls support

## Forms and Data
Use to create form from a Data item.

    <pp:form data="<data id>" ux="<simpleform | default>"></pp:form>

## Date time
Use to create form for a Data item.

    <pp:day></pp:day>
