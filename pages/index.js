import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/header';
import PostContainer from '../components/post-container';
import { getAllPosts } from '../lib/api';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
  const router = useRouter();
  const [post, setPost] = useState(posts);
  const [direction, setDirection] = useState('desc');
  const [query, setQuery] = useState('');

  const setValueAndOrder = async (e) => {
    await e.preventDefault();
    const res = await getAllPosts(direction);
    await setPost(res);
    await setDirection(direction === 'asc' ? 'desc' : 'asc');
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();
    await router.push({ pathname: '/search', query: { query } });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Wolfag Blog with Nextjs</title>
      </Head>
      <Header title='Wolfag Blog with Nextjs' />
      <div className={styles.sort}>
        <button onClick={setValueAndOrder}>
          Sort - Current order {direction.toLocaleLowerCase()}
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          placeholder='Search for Posts...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
      {post?.map(
        ({ _id: key, title, slug, author, deck, _createdAt: date, tags }) => (
          <PostContainer
            {...{
              key,
              title,
              slug,
              author,
              deck,
              date,
              tags,
            }}
          />
        )
      )}
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
