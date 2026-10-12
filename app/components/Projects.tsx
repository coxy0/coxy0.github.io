import { getProjects } from "../github";

export default async function Projects() {
  const projects = await getProjects();
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">Projects</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <li key={p.title}>
            <a
              href={p.href}
              target="_blank" rel="noopener noreferrer"
              className="block h-full rounded-lg border border-neutral-200 p-4 transition hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
            >
              <h3 className="font-medium">{p.title}</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{p.description}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs dark:bg-neutral-800"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </a>
          </li>
        ))}
      </ul>
      <a href="https://github.com/coxy0?tab=repositories" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm underline underline-offset-4">
        See all repos...
      </a>
    </section>
  );
}
