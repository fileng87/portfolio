import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import raw from 'rehype-raw';
import slug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeRewrite from 'rehype-rewrite';

type Props = {
  source?: string;
};

export default function MarkdownViewer({ source }: Props) {
  return (
    <>
      <div>
        <ReactMarkdown
          rehypePlugins={[
            raw,
            slug,
            headings,
            rehypePrism,
            [rehypeRewrite, { ignoreMissing: true }],
          ]}
          remarkPlugins={[gfm]}
        >
          {source || ''}
        </ReactMarkdown>
      </div>
    </>
  );
}
