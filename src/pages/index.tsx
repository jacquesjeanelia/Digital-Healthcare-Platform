import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sehaty | Modern Healthcare Platform</title>
        <meta name="description" content="Sehaty - A comprehensive digital healthcare solution for patients and medical providers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Sehaty</span>
        </h1>

        <p className={styles.description}>
          Your health companion - Connecting you with healthcare professionals seamlessly.
        </p>

        <div className={styles.grid}>
          <Link href="/auth/login" className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>Access your account as a patient or healthcare provider.</p>
          </Link>

          <Link href="/auth/register" className={styles.card}>
            <h2>Register &rarr;</h2>
            <p>Create a new account to use our platform.</p>
          </Link>

          <Link href="/appointments" className={styles.card}>
            <h2>Appointments &rarr;</h2>
            <p>Schedule, view, or manage your medical appointments.</p>
          </Link>

          <Link href="/medical-records" className={styles.card}>
            <h2>Medical Records &rarr;</h2>
            <p>Access your electronic health records securely.</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Sehaty &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
} 