import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export { allPosts };

export const allPostsNewToOld =
  allPosts?.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  }) || [];

export const allPostsPublished = allPosts.filter((post) => post.published);

export const allPostsNewToOldPublished = allPostsNewToOld.filter(
  (post) => post.published
);
