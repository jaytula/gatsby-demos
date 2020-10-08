exports.linkResolver = function linkResolver(doc) {
  // Route for blog posts
  if (doc.type === 'post') {
    return "/blog/" + doc.uid
  }
  // Homepage route fallback
  return "/"
}