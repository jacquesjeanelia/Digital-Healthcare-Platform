import Head from 'next/head';
import Link from 'next/link';
import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

// SafeLink component that preserves authentication state
const SafeLink = ({ href, className, children }: { href: string; className?: string; children: ReactNode }) => {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Use router.push instead of direct link to preserve state
    router.push(href);
  };
  
  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default function Layout({
  children,
  title = 'Sehaty',
  description = 'Your trusted digital healthcare companion',
}: LayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check authentication status on client-side only
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

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
          <SafeLink href="/">
            <span>Sehaty</span>
          </SafeLink>
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
          <SafeLink href="/" className={styles.navLink}>
            Home
          </SafeLink>
          <SafeLink href="/appointments" className={styles.navLink}>
            Appointments
          </SafeLink>
          <SafeLink href="/doctors" className={styles.navLink}>
            Find Doctors
          </SafeLink>
          
          {!isLoggedIn ? (
            <>
              <Link href="/auth/login" className={styles.navLink}>
                Login
              </Link>
              <Link href="/auth/register" className={styles.navLink}>
                Register
              </Link>
            </>
          ) : (
            <>
              <SafeLink href="/dashboard" className={styles.navLink}>
                Dashboard
              </SafeLink>
              <SafeLink href="/profile" className={styles.navLink}>
                Profile
              </SafeLink>
            </>
          )}
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Sehaty. All rights reserved.</p>
      </footer>
    </div>
  );
} 