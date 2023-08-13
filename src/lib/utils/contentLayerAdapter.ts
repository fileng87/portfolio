import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export { allPosts };

export const allPostsNewToOld =
  allPosts?.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  }) || [];
