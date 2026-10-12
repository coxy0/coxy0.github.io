import Contact from "./components/Contact";
import Projects from "./components/Projects";
import { name, tagline } from "./data";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-4 py-16">
      <header className="-mb-4">
        <h1 className="text-3xl font-semibold">{name}</h1>
        <p className="mt-1 text-neutral-500">{tagline}</p>
      </header>
      <Projects />
      <Contact />
    </main>
  );
}
