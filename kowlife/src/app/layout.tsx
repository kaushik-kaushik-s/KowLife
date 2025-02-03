import './globals.css';

export const metadata = {
  title: 'KowLife',
  description: 'A BitLife clone built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '1rem', background: '#333', color: '#fff', textAlign: 'center' }}>
          <h1>KowLife</h1>
        </header>
        <main style={{ margin: '1rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}