import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Wolfag Blog with NextJs</title>
      </Head>
    </div>
  );
}
