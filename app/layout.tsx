import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Sidebar from "@/components/shared/Sidebar";
import { createClient } from "@/utils/supabase/server";
import { cn } from "@/lib/utils";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <section className={cn('flex min-h-screen w-full flex-col bg-muted/40', !user && 'items-center justify-center')}>
          {user && <Sidebar />}
          {children}
        </section>
      </body>
    </html>
  );
}
