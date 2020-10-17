import { withPreview } from "gatsby-source-prismic"
import Post from './post';

// TODO: how can this component respond to /doc/[id] instead of just /doc

const Doc = withPreview(Post)
export default Doc