# html-tag-parser

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

## Installation

```
  npm install --save html-tag-parser
```

## Usage

```js
let htmlTagParser = require('html-tag-parser');

let html = '...'                            // html string

let tags = htmlTagParser(html, 'meta');     // return all 'meta' tags in the html string
tags = htmlTagParser(html, 'a', true);      // return all 'a' tags in the html string, the 
                                            // last parameter indicates the tag has a  
                                            // closing tag, as '</a>'
```

## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## Created with
[Yeoman](https://npmjs.org/package/yo) and [Generator-simple-package](https://npmjs.org/package/generator-simple-package)

## License
MIT © [Nghia Tran]()

[npm-image]: https://badge.fury.io/js/html-tag-parser.svg
[npm-url]: https://npmjs.org/package/html-tag-parser
[travis-image]: https://travis-ci.org/nghiattran/html-tag-parser.svg?branch=master
[travis-url]: https://travis-ci.org/nghiattran/html-tag-parser
[daviddm-image]: https://david-dm.org/nghiattran/html-tag-parser.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/nghiattran/html-tag-parser
[coveralls-image]: https://coveralls.io/repos/nghiattran/html-tag-parser/badge.svg
[coveralls-url]: https://coveralls.io/github/nghiattran/html-tag-parser
