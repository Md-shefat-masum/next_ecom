'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
  isLoading?: boolean;
  error?: string;
  success?: boolean;
}

export default function ForgotPasswordForm({ onSubmit, isLoading, error, success }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">Check your email</h2>
        <p className="text-gray-600 mb-6">
          We&apos;ve sent a password reset link to <strong>{email}</strong>
        </p>
        <Link href="/login" className="text-amber-600 hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
        <p className="text-gray-600">Enter your email to receive a reset link</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
          placeholder="you@example.com"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </button>

      <Link href="/login" className="flex items-center justify-center gap-2 text-gray-600 hover:text-amber-600">
        <ArrowLeft className="w-4 h-4" />
        Back to login
      </Link>
    </form>
  );
}

