import { H1, H2, H3, H4, H5, H6 } from '@/components/Customs/Heading';
import Link from '@/components/Customs/Link';
import Pre from '@/components/Customs/Pre';

const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: Pre,
  a: Link,
};

export default mdxComponents;
