import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './NavBar.module.css';

export default function NavBar() {
  const router = useRouter();
  console.log(router);

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a className={router.pathname === '/' && 'active'}>Home</a>
      </Link>
      <Link href="/about">
        <a className={router.pathname === '/about' && 'active'}>About</a>
      </Link>
      {/* styled jsx */}
      <style jsx>{`
        nav {
          background-color: tomato;
        }
        a {
          text=decoration: none;
        }
        .active {
          color: blue;
        }
      `}</style>
    </nav>
  );
}
