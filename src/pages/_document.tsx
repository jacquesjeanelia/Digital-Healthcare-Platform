import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta name="title" content="Sehaty - Modern Healthcare Platform" />
        <meta name="description" content="Connect with healthcare professionals and manage your health records securely" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Google Fonts - Support for both Latin and Arabic scripts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 