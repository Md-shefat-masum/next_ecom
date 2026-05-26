export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 px-6 py-10 text-zinc-950">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Fresh Next App
          </p>
          <h1 className="mt-3 text-3xl font-semibold">BME frontend foundation is ready.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
            Redux, API client, query client, config management, and project
            documentation are scaffolded for the next development phase.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {["Config", "API", "Store"].map((item) => (
            <div key={item} className="rounded-lg border border-zinc-200 bg-white p-5">
              <h2 className="text-lg font-semibold">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Base structure is in place and ready for feature modules.
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
