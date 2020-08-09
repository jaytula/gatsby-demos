## Notes

### Find and Modify Markdown Nodes

1. Install `unist-util-visit` as `visit` which is a walker for Unist (Unified Syntax Tree).  Unist is a
standard for Markdown syntax trees and parsers (including Remark and MDX).
2. Also install `mdast-util-to-string` as `toString`
3. Call `visit` with `markdownAST`, `'heading'`, and a function of type `node => void`.
4. Short-circuit end if `node.depth` is not equal to `1`
5. Extract text with `toString(node)`
6. Modify `node.type`, `node.children` and `node.value` directly