import Head from 'next/head';
import Header from '../components/header';
import PostContainer from '../components/post-container';
import { getAllPosts } from '../lib/api';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wolfag Blog with Nextjs</title>
      </Head>
      <Header title='Wolfag Blog with Nextjs' />
      {posts.map((post) => (
        <PostContainer
          key={post._id}
          title={post.title}
          slug={post.slug}
          author={post.author}
          deck={post.deck}
        />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
