export const linkResolver = ({node: doc}) => {
  console.log(doc);
  // Pretty URLs for known types
  if (doc.type === 'blog') return "/post/" + doc.uid;
  if (doc.type === 'page') return "/" + doc.uid;
  // Fallback for other types, in case new custom types get created
  console.log('got here');
  return "/doc/" + doc.id;
};