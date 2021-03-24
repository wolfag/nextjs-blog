import Link from 'next/link';
import styles from '../styles/PostContainer.module.css';

export default function PostContainer({ title, deck, slug, author: { name } }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Link href={`/blog/${slug}`}>{title}</Link>
      </div>
      <div className={styles.author}>{name}</div>
      <div className={styles.deck}>
        <p>{deck}</p>
      </div>
      <div className={styles.read}>
        <Link href={`/blog/${slug}`}>Read More</Link>
      </div>
    </div>
  );
}
