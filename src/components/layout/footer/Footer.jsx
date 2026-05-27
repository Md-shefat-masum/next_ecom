import Link from "next/link";
import { defaultGeneralInfo } from "@/config";

const footerLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/common/terms", label: "Terms" },
  { href: "/common/condition", label: "Condition" },
  { href: "/sitemap", label: "Sitemap" },
];

export function Footer() {
  return (
    <footer
      className="mt-auto border-t"
      style={{
        backgroundColor: defaultGeneralInfo.card_background_color,
        borderColor: defaultGeneralInfo.border_color,
      }}
    >
      <div className="container flex flex-col gap-4 py-6 text-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-semibold" style={{ color: defaultGeneralInfo.title_color }}>
            {defaultGeneralInfo.company_name}
          </p>
          <p className="mt-1" style={{ color: defaultGeneralInfo.text_muted_color }}>
            {defaultGeneralInfo.footer_copyright_text}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[var(--bme-primary)]"
              style={{ color: defaultGeneralInfo.text_body_color }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
