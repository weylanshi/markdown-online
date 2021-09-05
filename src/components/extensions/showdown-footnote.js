const footnote = () => [{
  type: 'lang',
  filter: function filter(text, converter) {
    return text.replace(/^\[\^([\d\w]+)\]:\s*((\n+(\s{2,4}|\t).+)+)$/mg, (str, name, rawContent, _, padding) => {
      const content = converter.makeHtml(rawContent.replace(new RegExp(`^${padding}`, 'gm'), ''));
      return `<div class="footnote" id="footnote-${name}"><a href="#footnote-${name}"><sup>[${name}]</sup></a>:${content}</div>`;
    });
  },
}, {
  type: 'lang',
  filter: function filter(text) {
    return text.replace(/^\[\^([\d\w]+)\]:( |\n)((.+\n)*.+)$/mg, (str, name, _, content) => `<small class="footnote" id="footnote-${name}"><a href="#footnote-${name}"><sup>[${name}]</sup></a>: ${content}</small>`);
  },
}, {
  type: 'lang',
  filter: function filter(text) {
    return text.replace(/\[\^([\d\w]+)\]/m, (str, name) => `<a href="#footnote-${name}"><sup>[${name}]</sup></a>`);
  },
}];

export default footnote;
