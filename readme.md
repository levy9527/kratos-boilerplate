This project uses Pug, Stylus, Gulp and Browsersync.

Maybe you want to read about them:
- [NPM Scripts](https://docs.npmjs.com/misc/scripts)
- [GulpJS](http://gulpjs.com/)
- [Pug](https://github.com/pugjs/pug)
- [Stylus](http://learnboost.github.io/stylus/)
- [Browsersync](https://www.browsersync.io/)
- [StandardJs](https://www.npmjs.com/package/standard)
- [Stylint](https://simenb.github.io/stylint/)

## Getting Started

### Installation

First of all, install the dependencies to run this boilerplate.

- [NodeJS](http://nodejs.org/)

```sh
# install dependencies
$ npm i -d

```

### dev

```sh
$ npm start
```

### build
```sh
$ npm run build
```

### Scripts


- `npm start`: run all tasks and initialize watch for changes and a server
- `npm test`: lint javascript and css and report your css complexity
- `npm run lint`: lint your js and css file
- `npm run fix`: command to fix all eslint errors
- `npm run reporter`: test css complexity
- `npm run build`: run all tasks to build and deploy

### Tasks

you may also using `gulp` instead of `npm run xxx`

- `gulp server`: watch and live-reload (this task not build files on start, this mostly used in the situation that you've run `gulp build`)
- `gulp build`: build html/css/js/images files into build directory
- `gulp deploy`: inject hash with css/js for production deploy


With the commands above, you have everything to start.

### Folders and Files

```sh
├── README.md
├── build
│   ├── css
│   │   └── style.css
│   ├── images/
│   ├── js
│   │   └──  main.js
│   ├── index.html
├── gulpfile.js
├── package.json
└── src
    ├── images/
    ├── js/
    ├── styl
    │   └── style.styl
    └── jade
        └── index.jade
```

Those folders and file will change during the project.


### Code Standards

<! --
This project uses this [Coding Style](https://github.com/LFeh/coding-style) as code reference.
-->

This project also uses [Husky](https://github.com/typicode/husky) to prevent commit and push messy and wrong code.

To help you, this project has a `npm run fix` command to fix all eslint errors.


#### Parker CSS

To view a reporter of CSS files, use a `npm run reporter` command.


## Credits

This boilerplate uses as a base the awesome [Qualy Boilerplate](https://github.com/Qualy-org/qualy) by [@Willian_justen](https://twitter.com/Willian_justen) :heart:


## License

[MIT License](http://felipefialho.mit-license.org/) © Felipe Fialho
