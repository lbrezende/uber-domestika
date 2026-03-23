import { Navbar } from "@/components/navbar";
import { QueryProvider } from "@/components/query-provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-gray-50/50">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </div>
    </QueryProvider>
  );
}
