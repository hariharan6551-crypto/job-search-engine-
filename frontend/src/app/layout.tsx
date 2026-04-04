import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { AIChatBot } from '@/components/AIChatBot';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'JobAI — AI-Powered Career Platform',
  description:
    'Discover your perfect career match with AI-powered job recommendations, resume analysis, and smart location-based job search.',
  keywords: ['jobs', 'AI', 'career', 'resume parser', 'job recommendations', 'job search'],
  authors: [{ name: 'Job AI Platform' }],
  openGraph: {
    title: 'JobAI — AI-Powered Career Platform',
    description: 'Smart job search powered by artificial intelligence',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background antialiased">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent pointer-events-none z-0" />
        <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-neon-purple/5 via-transparent to-transparent pointer-events-none z-0" />

        {/* App Shell */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <AIChatBot />
          <footer className="border-t border-white/5 py-8">
            <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
              <p>© 2026 JobAI Platform · AI-Powered Career Intelligence</p>
            </div>
          </footer>
        </div>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(222 47% 8%)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'hsl(210 40% 98%)',
            },
          }}
        />
      </body>
    </html>
  );
}
