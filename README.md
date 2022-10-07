# Arch II

A PoC for using semantic/agnostic markup and component frameworks to render a webpage. This codebase is cross platform and does not require any dependencies beyond those installed.

## Pre-reqs

Install LTS version of [NodeJS](https://nodejs.org/en/)

## Services & Libraries

The codebase is made up of 4 parts

- [Client](./client/README.md) - A user experience to author Sites, Pages and Content
- [Middle](./middle/README.md) - The data access service
- [Library](./library/README.md) - A library that provides markup transformations for supported CSS frameworks. Designed for browser or server usage
- [Server](./server/README.md) - A web server for server side rendering of webpages and static content

## Installing

Review each of the individual README.md files and follow the instruction. Each service will need to be run in its own console window.

**Pay special attention** to setting up the [Library](./library/README.md) as this needs to be _npm linked_ for the client to build.

## TLDR

```
./build.sh
./start.sh
```

## Build sequence

1. [Library](./library/README.md) (with Symbolic links created)
2. [Client](./client/README.md) - Build through _npm run start_
3. [Middle](./middle/README.md) - Build not required
4. [Server](./server/README.md) - Build not required

Once all services are built and linked, you do not need to rebuild unless the code has changed. Therefore you will only need to do the Startup Sequence activities to run the system.

## Startup sequence

This doesn't matter as the system will correct itself on a browser refresh. But here is the optimal order.

1. [Middle](./middle/README.md)
2. [Server](./server/README.md)
3. [Client](./client/README.md)

### Usage

Once all services are up and running visit http://locahost:3000 in a web browser.

# Authoring

You can use any HTML you desire as the markup. However, if you use any of the following elements (instead of framework DOM structures), the rendered version will utilze the stylesheet "engine" as set at the Site level and the system will transform the HTML into the desire DOM structures. For embedded form controls, remove as many of your custom css classes as possible.

### CSS

Content is assembled prior to serving to the browser. Therefore CSS can be added prior to the DOM which it targets. It can be embbeded directly into the markup or a site level style sheet can be added.

## Composablity support

Use to embedded fragements of reuseable content. Works when referencing server controls. Has no child elements.

    <Content id="<content id">

## Responsive controls support

Styling of these DOM structures will happen through the transformation engine.

### Section

Use to contain any content at 100% width. Has a targetable class attribute. Child elements honored.

    <Section>
    ...
    </Section>

Becomes

    <div class="section">
    ...
    </div>

### Grids

Use to define a 12 column capable grid. columns will be devided equally or rounded down. Has some targetable class attributes. Child elements honored.

    <Grid>
      <Row>
        <Column>...</Column>
        <Column>...</Column>
        <Column>...</Column>
      </Row>
    <Grid>

Becomes

    <div class="container">
      <div class="<row classes>">
         <div class="<column classes>">...</div>
         <div class="<column classes>">...</div>
         <div class="<column classes>">...</div>
      </div>
    </div>

### Form Groups

Use to define a container around a group of controls in a from like a label and input field. Child elements honored.

    <group>
    ...
    </group>

Becomes (for Bootstrap only). Has targetable class attribute. Child elements honored.

    <div class="form-group">
    ...
    </div>

## Instrinsic controls support

Styling of these instrinsic controls will happen through the transformation engine.

### Buttons

Use to style any HTML button element. Child elements honored.

    <Button>...</Button>

### Inputs

Use to style any HTML input element. Child elements honored.

    <input>...</input>

## Server controls support

The HTML for these controls will be built by the server and are typically used where the UX is connected to backend services like a form.

## Forms and Data

Use to create form from a Data item. Has no child elements.

    <Form data="<data id>" ux="<simpleform | default>" />

## Date time

Use to return a long string version of the current Data and Time. Has no child elements.

    <Date locale="<locale> | en-us" />
