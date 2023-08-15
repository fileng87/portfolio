// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import gfm from 'remark-gfm';
import ins from 'remark-ins';
import markers from 'remark-flexible-markers';
import slug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `posts/**/*.mdx`,
  fields: {
    published: {
      type: 'boolean',
      default: true,
    },
    author: { type: 'string', required: true },
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    cover: { type: 'string', default: '/images/blog-none.jpg' },
    date: { type: 'date', required: true },
  },
  computedFields: {
    path: {
      type: 'string',
      resolve: (post) => `posts/${post._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (post) =>
        encodeURI(post._raw.sourceFileName.replace('.mdx', '')),
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [gfm, ins, markers],
    rehypePlugins: [
      slug,
      headings,
      rehypeCodeTitles,
      [rehypePrism, { ignoreMissing: true }],
    ],
  },
});
