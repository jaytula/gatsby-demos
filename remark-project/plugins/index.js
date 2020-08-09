const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

module.exports = ({ markdownAST }, pluginOptions) => {
  // Manipulate AST
  console.log(">>> In Plugin");

  visit(markdownAST, "heading", node => {
    const { depth } = node;

    if (depth !== 1) return;

    const text = toString(node);

    const html =`
      <h1 style="color: rebeccapurple">
        ${text}
      </h1>
      `
    node.type = "html"
    node.children = undefined;
    node.value = html;
  })
  return markdownAST;
};
