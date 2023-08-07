import type { PostMetadata } from '@/types/PostMetadata';
import fs from 'fs';
import matter from 'gray-matter';

export const getPost = (fileName: string) => {
  try {
    const fileContent = fs.readFileSync(
      decodeURI(`posts/${fileName}`),
      'utf-8'
    );
    const matterResult = matter(fileContent);

    return {
      content: matterResult.content,
      author: matterResult.data.author || 'Unknow',
      avatar: matterResult.data.avatar || '/images/blog/blog-none.jpg',
      title: matterResult.data.title || 'None',
      subtitle: matterResult.data.subtitle,
      date: matterResult.data.date || 'unknow',
      slug: fileName.replace('.md', ''),
    };
  } catch (e) {
    return;
  }
};

export const getPostMetadata = (): (PostMetadata | undefined)[] => {
  const folder = 'posts/';
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith('.md'));

  const posts = markdownPosts.map(getPost);

  return posts;
};
