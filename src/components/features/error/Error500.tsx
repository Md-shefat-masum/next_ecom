import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Error500Props {
  onRetry?: () => void;
}

export default function Error500({ onRetry }: Error500Props) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Server Error</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Something went wrong on our end. Please try again later.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {onRetry && (
            <button onClick={onRetry} className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          )}
          <Link href="/" className="px-6 py-3 border rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

