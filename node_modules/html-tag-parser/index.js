'use strict';
let Source = require('source-component');

module.exports = function(html, tag, hasClosing){
  html = html.replace(/(\r\n|\n|\r)/gm," ");
  let pool = [];
  const source = new Source(html);
  const start1 = '<{tag} '.replace('{tag}', tag);
  const start2 = '<{tag}>'.replace('{tag}', tag);
  const end = hasClosing ? '</{tag}>'.replace('{tag}', tag) : '>';

  let char = source.currentChar();
  while (char) {
    if (char === '<' && (source.isNext(start1) || source.isNext(start2))) {
      pool.push(getTagContent(source, end))
    }
    char = source.nextChar();
  }
  return pool;
};

function getTagContent(source, endTag) {
  let char = source.currentChar();
  let content = '';
  while (char) {
    if (source.isNext(endTag)) {
      content += endTag;
      source.skip(endTag.length - 1);
      return content;
    }

    content += char;
    char = source.nextChar();
  }
}