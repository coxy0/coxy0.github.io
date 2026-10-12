import { links } from "../data";

export default function Contact() {
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">Links</h2>
      <ul className="flex gap-5">
        {links.map(({ name, href, icon: Icon }) => (
          <li key={name}>
            <a href={href} aria-label={name} title={name} className="opacity-80 transition hover:opacity-100">
              <Icon size={28} aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
