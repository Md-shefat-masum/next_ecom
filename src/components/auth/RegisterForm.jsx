"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { defaultGeneralInfo } from "@/config";
import { authService } from "@/lib/api/authService";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";

const inputClass =
  "w-full rounded-lg border border-[#D8E4F2] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0B5FAE] focus:ring-2 focus:ring-[#0B5FAE]/10";

export function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGlobalError("");
    setIsLoading(true);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const password = String(fd.get("password") || "");
    const confirmation = String(fd.get("password_confirmation") || "");

    if (password !== confirmation) {
      setErrors({ password_confirmation: "Passwords do not match." });
      setIsLoading(false);
      return;
    }

    try {
      const res = await authService.register(name, email, password, confirmation);
      const user = res.data?.user ?? res.user ?? null;
      dispatch(setUser(user));
      router.push("/profile");
    } catch (err) {
      if (err?.data?.errors) {
        // Map API validation errors (field → first message)
        const apiErrors = {};
        Object.entries(err.data.errors).forEach(([key, msgs]) => {
          apiErrors[key] = Array.isArray(msgs) ? msgs[0] : msgs;
        });
        setErrors(apiErrors);
      } else {
        setGlobalError(
          err?.data?.message || err?.message || "Registration failed. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fieldError = (key) =>
    errors[key] ? (
      <p className="mt-1 text-xs text-red-500">{errors[key]}</p>
    ) : null;

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div
            className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: `${defaultGeneralInfo.primary_color}15` }}
          >
            <UserPlus size={26} style={{ color: defaultGeneralInfo.primary_color }} />
          </div>
          <h1 className="text-2xl font-bold text-[#071B3A]">Create an account</h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Join us today — it&apos;s free!
          </p>
        </div>

        {globalError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {globalError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">
              Full Name *
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Your full name"
              className={inputClass}
            />
            {fieldError("name")}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">
              Phone *
            </label>
            <input
              name="phone"
              type="tel"
              required
              placeholder="01xxxxxxxxx"
              className={inputClass}
            />
            {fieldError("phone")}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">
              Email *
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={inputClass}
            />
            {fieldError("email")}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">
              Password *
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                placeholder="At least 6 characters"
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fieldError("password")}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                name="password_confirmation"
                type={showConfirm ? "text" : "password"}
                required
                placeholder="Re-enter your password"
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fieldError("password_confirmation")}
          </div>

          <label className="flex cursor-pointer items-start gap-2 text-sm text-[#64748B]">
            <input type="checkbox" required className="mt-0.5 rounded" />
            <span>
              By creating an account you agree to our{" "}
              <Link
                href="/common/terms"
                className="font-medium hover:underline"
                style={{ color: defaultGeneralInfo.primary_color }}
              >
                Terms &amp; Conditions
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg py-3 text-sm font-semibold text-white transition disabled:opacity-60"
            style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#64748B]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold hover:underline"
            style={{ color: defaultGeneralInfo.primary_color }}
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
