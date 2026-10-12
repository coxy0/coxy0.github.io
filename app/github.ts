import type { Project } from "./data";

const USER = "coxy0";

type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl?: string | null;
  languages: string[];
};

// Pinned repos exist only in the GraphQL API, which needs a token (Actions provides GITHUB_TOKEN).
async function pinned(token: string): Promise<Repo[]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{ user(login: "${USER}") { pinnedItems(first: 6, types: REPOSITORY) { nodes { ... on Repository {
        name description url homepageUrl languages(first: 3) { nodes { name } } } } } } }`,
    }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data.user.pinnedItems.nodes.map((n: Repo & { languages: { nodes: { name: string }[] } }) => ({
    ...n,
    languages: n.languages.nodes.map((l) => l.name),
  }));
}

// Fallback without a token: most recently pushed non-fork public repos.
async function recent(): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=30`);
  if (!res.ok) throw new Error(`GitHub REST ${res.status}`);
  const repos: { name: string; description: string | null; html_url: string; homepage: string | null; language: string | null; fork: boolean }[] =
    await res.json();
  return repos
    .filter((r) => !r.fork)
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepageUrl: r.homepage,
      languages: r.language ? [r.language] : [],
    }));
}

export async function getProjects(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN;
  let repos: Repo[];
  try {
    repos = token ? await pinned(token) : await recent();
  } catch (e) {
    // Fail the build rather than ship an empty projects section.
    throw new Error(`Could not load GitHub projects: ${e}`);
  }
  return repos.map((r) => ({
    title: r.name,
    description: r.description ?? "",
    tags: r.languages,
    href: r.homepageUrl || r.url,
  }));
}
