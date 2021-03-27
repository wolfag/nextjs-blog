import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/header';
import PostContainer from '../../components/post-container';
import { getAllPostsTags, getPostsByTag } from '../../lib/api';
import styles from '..//../styles/Tag.module.css';

function Tag({ post }) {
  return (
    <div>
      <Head>
        <title key={post.name}>{post.name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header title={`Tag - ${post.name}`} />
          <h2 className={styles.home}>
            <Link href={`/`}>🏠 Home</Link>
          </h2>
        </div>
        <div className={styles.posts}>
          <div className={styles.posts_body}>
            {post.postSet.items.map(
              ({
                _id: key,
                title,
                slug,
                author,
                deck,
                tags,
                _createdAt: date,
              }) => (
                <PostContainer
                  {...{ key, title, slug, author, deck, tags, date }}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const allTags = await getAllPostsTags();
  const paths = allTags.map(({ _id }) => ({
    params: { _id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostsByTag(params._id);

  return {
    props: {
      post,
    },
  };
}

export default Tag;
