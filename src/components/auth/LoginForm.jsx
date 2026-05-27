"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { defaultGeneralInfo } from "@/config";
import { authService } from "@/lib/api/authService";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";

const inputClass =
  "w-full rounded-lg border border-[#D8E4F2] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0B5FAE] focus:ring-2 focus:ring-[#0B5FAE]/10";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectTo = searchParams.get("redirect") || "/profile";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    try {
      const res = await authService.login(email, password);
      const user = res.data?.user ?? res.user ?? null;
      dispatch(setUser(user));
      router.push(redirectTo);
    } catch (err) {
      setError(
        err?.data?.message || err?.message || "Invalid email or password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div
            className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: `${defaultGeneralInfo.primary_color}15` }}
          >
            <LogIn
              size={26}
              style={{ color: defaultGeneralInfo.primary_color }}
            />
          </div>
          <h1 className="text-2xl font-bold text-[#071B3A]">
            Login to your account
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Welcome back! Please enter your credentials.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#071B3A]">
              Email or Phone
            </label>
            <input
              name="email"
              type="text"
              required
              autoComplete="username"
              placeholder="Enter email or phone"
              className={inputClass}
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-[#071B3A]">
                Password
              </label>
              <Link
                href="/forget-password"
                className="text-xs font-medium hover:underline"
                style={{ color: defaultGeneralInfo.primary_color }}
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
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
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#64748B]">
            <input type="checkbox" name="remember" className="rounded" />
            Remember me
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg py-3 text-sm font-semibold text-white transition disabled:opacity-60"
            style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#64748B]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold hover:underline"
            style={{ color: defaultGeneralInfo.primary_color }}
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
