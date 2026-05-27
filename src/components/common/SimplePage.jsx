import { defaultGeneralInfo } from "@/config";

export function SimplePage({ title, description }) {
  return (
    <section className="mx-auto w-full max-w-[1520px] px-4 py-10 sm:px-6 md:px-8">
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: defaultGeneralInfo.card_background_color,
          borderColor: defaultGeneralInfo.border_soft_color,
        }}
      >
        <h1
          className="text-2xl font-semibold sm:text-3xl"
          style={{ color: defaultGeneralInfo.title_color }}
        >
          {title}
        </h1>
        <p
          className="mt-3 text-sm leading-6 sm:text-base"
          style={{ color: defaultGeneralInfo.text_body_color }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
