import Head from 'next/head';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import styles from '@/styles/Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  title = 'Sehaty',
  description = 'Your trusted digital healthcare companion',
}: LayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <span>Sehaty</span>
          </Link>
        </div>

        <button
          className={styles.menuButton}
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.nav} ${isNavOpen ? styles.active : ''}`}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/appointments" className={styles.navLink}>
            Appointments
          </Link>
          <Link href="/doctors" className={styles.navLink}>
            Find Doctors
          </Link>
          <Link href="/auth/login" className={styles.navLink}>
            Login
          </Link>
          <Link href="/auth/register" className={styles.navLink}>
            Register
          </Link>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Sehaty. All rights reserved.</p>
      </footer>
    </div>
  );
} 