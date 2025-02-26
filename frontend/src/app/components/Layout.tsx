import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto px-8">
        {children}
      </div>
    </main>
  );
} 