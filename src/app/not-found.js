import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { defaultGeneralInfo } from "@/config";

export default function NotFound() {
  return (
    <SiteLayout>
      <section className="mx-auto flex min-h-[420px] w-full max-w-[1520px] items-center justify-center px-4 py-12 sm:px-6 md:px-8">
        <div className="text-center">
          <p
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: defaultGeneralInfo.primary_color }}
          >
            404
          </p>
          <h1
            className="mt-3 text-3xl font-semibold sm:text-4xl"
            style={{ color: defaultGeneralInfo.title_color }}
          >
            Page Not Found
          </h1>
          <p className="mt-3 text-sm" style={{ color: defaultGeneralInfo.text_muted_color }}>
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition hover:opacity-90"
            style={{
              backgroundColor: defaultGeneralInfo.button_primary_color,
              color: defaultGeneralInfo.button_text_color,
            }}
          >
            Go to Home
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
