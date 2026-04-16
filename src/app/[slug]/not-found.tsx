import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="px-6 py-3 bg-bme-orange text-white rounded-lg hover:bg-primary-hover transition flex items-center gap-2">
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button onClick={() => window.history.back()} className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

