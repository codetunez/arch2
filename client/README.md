# Client - Authoring IDE

## Pre-reqs
Install LTS version of [NodeJS](https://nodejs.org/en/)

## Usage and Build
It is important to do the following steps. Missing a step will cause the client to not build.

__1. Build the client__
```
npm i  --legacy-peer-deps
```

__2. Connect the Symbolic link__\
This client needs access to the transformation [library](../library/README.md). Because this needs to be referenced like a regular node package (but it is not in npmjs), you have to reference it via a Symbolic link.

Ensure you have built the [library](../library/README.md) and created the Symbolic link before doing the following

```
npm link library  --legacy-peer-deps
```
...after this, a package called _library_ will be added to the client's node_modules

After this you may start the client

### To start the client
```
npm run start
```
(Webpack errors can be ignored)

### Client endpoint
Client runs as a browser based SPA application
```
http://localhost:3000
```