"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Heart,
  LogIn,
  LogOut,
  MonitorCog,
  PackageCheck,
  ShoppingBag,
  ShoppingCart,
  User,
  UserPlus,
} from "lucide-react";
import { defaultGeneralInfo } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearUser, selectAuthUser, selectIsLoggedIn } from "@/store/slices/authSlice";
import { authService } from "@/lib/api/authService";

const staticActions = [
  {
    href: "/track-order",
    label: "Track Order",
    ariaLabel: "Track Order",
    Icon: PackageCheck,
    hideOnSmall: true,
  },
  {
    href: "/pc-build",
    label: "PC Build",
    ariaLabel: "PC Build",
    Icon: MonitorCog,
    hideOnSmall: true,
  },
];

function AccountDropdown() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectAuthUser);

  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authService.logout();
    } finally {
      dispatch(clearUser());
      setOpen(false);
      router.push("/login");
      setLoggingOut(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="group flex min-w-9 flex-col items-center justify-center gap-1 text-[var(--action-color)] transition hover:text-[var(--action-hover)]"
          aria-label="Account"
        >
          <span className="flex h-7 items-center gap-0.5">
            <User size={24} strokeWidth={2} />
            <ChevronDown className="hidden lg:block" size={14} />
          </span>
          <span className="hidden whitespace-nowrap text-xs font-medium leading-none lg:block">Account</span>
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl bg-white p-1 shadow-xl ring-1 ring-black/5">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#071B3A] hover:bg-[#F1F5F9]"
            >
              <LogIn size={16} className="text-[#64748B]" />
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#071B3A] hover:bg-[#F1F5F9]"
            >
              <UserPlus size={16} className="text-[#64748B]" />
              Create Account
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Logged-in dropdown
  const initials = (user?.name || "U")[0].toUpperCase();
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="group flex min-w-9 flex-col items-center justify-center gap-1 text-[var(--action-color)] transition hover:text-[var(--action-hover)]"
        aria-label="Account"
      >
        <span className="flex h-7 items-center gap-0.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: defaultGeneralInfo.primary_color }}
          >
            {initials}
          </span>
          <ChevronDown className="hidden lg:block" size={14} />
        </span>
        <span className="hidden max-w-[80px] truncate whitespace-nowrap text-xs font-medium leading-none lg:block">
          {user?.name?.split(" ")[0] || "Account"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl bg-white p-1 shadow-xl ring-1 ring-black/5">
          {/* Header */}
          <div className="px-3 py-2.5">
            <p className="truncate text-sm font-semibold text-[#071B3A]">{user?.name}</p>
            <p className="truncate text-xs text-[#64748B]">{user?.email}</p>
          </div>
          <div className="my-1 h-px bg-[#F1F5F9]" />

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#071B3A] hover:bg-[#F1F5F9]"
          >
            <User size={16} className="text-[#64748B]" />
            My Profile
          </Link>
          <Link
            href="/profile?tab=orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#071B3A] hover:bg-[#F1F5F9]"
          >
            <ShoppingBag size={16} className="text-[#64748B]" />
            My Orders
          </Link>

          <div className="my-1 h-px bg-[#F1F5F9]" />

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 disabled:opacity-60"
          >
            <LogOut size={16} />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}

export function HeaderActions() {
  const cartCount = useAppSelector((state) => state.cart.count);

  return (
    <nav
      className="flex shrink-0 items-center justify-end gap-3 md:gap-5 lg:gap-7 xl:gap-8"
      aria-label="Header actions"
      style={{
        "--action-color": defaultGeneralInfo.title_color,
        "--action-hover": defaultGeneralInfo.primary_color,
        "--badge-text": defaultGeneralInfo.button_text_color,
      }}
    >
      {staticActions.map(({ href, label, ariaLabel, Icon, hideOnSmall }) => (
        <Link
          key={label}
          href={href}
          aria-label={ariaLabel}
          className={[
            "group flex min-w-9 flex-col items-center justify-center gap-1 text-[var(--action-color)] transition hover:text-[var(--action-hover)]",
            hideOnSmall ? "hidden lg:flex" : "flex",
          ].join(" ")}
        >
          <span className="relative flex h-7 items-center justify-center">
            <Icon size={24} strokeWidth={2} />
          </span>
          <span className="hidden whitespace-nowrap text-xs font-medium leading-none lg:block">
            {label}
          </span>
        </Link>
      ))}

      {/* Auth-aware account dropdown */}
      <AccountDropdown />

      {/* Wishlist */}
      <Link
        href="/wishlist"
        aria-label="Wishlist"
        className="group flex min-w-9 flex-col items-center justify-center gap-1 text-[var(--action-color)] transition hover:text-[var(--action-hover)]"
      >
        <span className="relative flex h-7 items-center justify-center">
          <Heart size={24} strokeWidth={2} />
          <span
            className="absolute -right-2 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none text-[var(--badge-text)]"
            style={{ backgroundColor: defaultGeneralInfo.button_primary_color }}
          >
            0
          </span>
        </span>
        <span className="hidden whitespace-nowrap text-xs font-medium leading-none lg:block">
          Wishlist
        </span>
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        aria-label="Cart"
        className="group flex min-w-9 flex-col items-center justify-center gap-1 text-[var(--action-color)] transition hover:text-[var(--action-hover)]"
      >
        <span className="relative flex h-7 items-center justify-center">
          <ShoppingCart size={24} strokeWidth={2} />
          {cartCount > 0 && (
            <span
              className="absolute -right-2 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none text-[var(--badge-text)]"
              style={{ backgroundColor: defaultGeneralInfo.accent_color }}
            >
              {cartCount}
            </span>
          )}
        </span>
        <span className="hidden whitespace-nowrap text-xs font-medium leading-none lg:block">
          Cart
        </span>
      </Link>
    </nav>
  );
}
