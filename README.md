# Sample vulnerable app with Sqreen and TypeScript

## Building and Running

There are two way of running this app, but first of all you need to add a 
`sqreen.json` file. Got to https://my.sqreen.io to get the install instructions.
Also, run a `npm install` after cloning the repo ;)

### Simple TypeScript target
```bash
$ npm run build:ts && node built/server.js
```

### Webpack +  TypeScript target
```bash
$ npm run build:wp && node dist/bundle.js
```

## Attack
A vulnerable endpoint is provided:

* going to http://localhost:3000/items/1 is not an injection
* but going to [http://localhost:3000/items/1 OR 1=1](http://localhost:3000/items/1%20OR%201=1) is!

