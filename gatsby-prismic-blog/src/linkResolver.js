export const linkResolver = ({node: doc}) => {
  // Pretty URLs for known types
  if (doc.type === 'blog') return () => "/post/" + doc.uid;
  if (doc.type === 'page') return () => "/" + doc.uid;
  // Fallback for other types, in case new custom types get created

  return () => "/doc/" + doc.uid;
};