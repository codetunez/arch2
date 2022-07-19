# Library - Transformation Engine

## Pre-reqs
Install LTS version of [NodeJS](https://nodejs.org/en/)

## Usage
It is important to do the following steps. Missing a step will cause the [client](../client/README.md) to not build.

__1. Build the library__
```
npm i
```

__2. Create a Symbolic link__
This will allow this folder to act and be referenced like a node module without the need to install like a module
```
npm link
```
...in the [client](../client/README.md) folder run
```
npm link library
```

## Other usage

### Remove the Symbolic link
```
npm unlink
```

### Produce a d.ts file
You will need to unlink and re-link the library if you change this whilst it is currently linked
```
 tsc --declaration --allowjs --emitDeclarationOnly index.js
```

### Using as a require
The folder can be imported into Node apps
```
const lib = require('../library');
```