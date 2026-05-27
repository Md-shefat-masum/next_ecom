"use client";

import Link from "next/link";
import {
  ChevronDown,
  Heart,
  MonitorCog,
  PackageCheck,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { defaultGeneralInfo } from "@/config";
import { useAppSelector } from "@/store/hooks";

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
  {
    href: "/account",
    label: "Account",
    ariaLabel: "Account",
    Icon: UserRound,
    hasChevron: true,
  },
  {
    href: "/wishlist",
    label: "Wishlist",
    ariaLabel: "Wishlist",
    Icon: Heart,
    badge: 3,
    badgeColor: defaultGeneralInfo.button_primary_color,
  },
];

export function HeaderActions() {
  const cartCount = useAppSelector((state) => state.cart.count);

  const actions = [
    ...staticActions,
    {
      href: "/cart",
      label: "Cart",
      ariaLabel: "Cart",
      Icon: ShoppingCart,
      badge: cartCount > 0 ? cartCount : null,
      badgeColor: defaultGeneralInfo.accent_color,
    },
  ];

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
      {actions.map(({ href, label, ariaLabel, Icon, badge, badgeColor, hasChevron, hideOnSmall }) => (
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
            {hasChevron ? <ChevronDown className="ml-0.5 hidden lg:block" size={14} /> : null}
            {badge ? (
              <span
                className="absolute -right-2 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none text-[var(--badge-text)]"
                style={{ backgroundColor: badgeColor }}
              >
                {badge}
              </span>
            ) : null}
          </span>
          <span className="hidden whitespace-nowrap text-xs font-medium leading-none lg:block">
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
