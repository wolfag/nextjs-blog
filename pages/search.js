import Head from 'next/head';
import styles from '../styles/Search.module.css';
import Link from 'next/link';
import Header from '../components/header';
import PostContainer from '../components/post-container';
import { searchPosts } from '../lib/api';

export default function Search({ post, searchQuery }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{searchQuery}</title>
      </Head>
      <Header title='TakeShape Blog with NextJS' />
      <h2 className={styles.home}>
        <Link href={`/`}>🏠 Home</Link>
      </h2>
      {searchQuery && (
        <div className={styles.query}>Search Query: {searchQuery}</div>
      )}
      {post.length ? (
        <div className={styles.posts}>
          {post.map((post) => (
            <PostContainer
              post={post}
              key={post._id}
              title={post.title}
              slug={post.slug}
              deck={post.deck}
              author={post.author}
              tags={post.tags}
              data={post._createdAt}
            />
          ))}
        </div>
      ) : (
        <h1>No Results</h1>
      )}
    </div>
  );
}

export async function getServerSideProps({ query: { query } }) {
  const post = await searchPosts(query);
  return {
    props: {
      post,
      searchQuery: query,
    },
  };
}
