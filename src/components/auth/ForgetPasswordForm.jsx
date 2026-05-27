"use client";

import { useState } from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { defaultGeneralInfo } from "@/config";
import api from "@/lib/api/client";

const inputClass =
  "w-full rounded-lg border border-[#D8E4F2] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0B5FAE] focus:ring-2 focus:ring-[#0B5FAE]/10";

export function ForgetPasswordForm() {
  const [step, setStep] = useState("request"); // "request" | "sent"
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await api.post("/auth/forgot-password", { email: email.trim() });
      setStep("sent");
    } catch (err) {
      setError(
        err?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div
            className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: `${defaultGeneralInfo.primary_color}15` }}
          >
            <KeyRound size={26} style={{ color: defaultGeneralInfo.primary_color }} />
          </div>
          <h1 className="text-2xl font-bold text-[#071B3A]">Forgot Password?</h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Enter your registered email and we&apos;ll send you a reset link.
          </p>
        </div>

        {step === "sent" ? (
          <div className="rounded-lg bg-green-50 p-5 text-center">
            <svg
              className="mx-auto mb-3 h-12 w-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm font-medium text-green-700">
              Reset link sent!
            </p>
            <p className="mt-1 text-xs text-green-600">
              Check your inbox at <strong>{email}</strong> and follow the
              instructions.
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg py-3 text-sm font-semibold text-white transition disabled:opacity-60"
                style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-[#64748B]">
          <Link
            href="/login"
            className="font-semibold hover:underline"
            style={{ color: defaultGeneralInfo.primary_color }}
          >
            ← Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPasswordForm;
