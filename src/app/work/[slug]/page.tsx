import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge, PixelWindow, SectionTitle } from "@/components/portfolio/PixelWindow";
import { getNextProject, getProject, projects } from "@/data/projects";

type CaseStudyProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProject(slug);
  const next = getNextProject(slug);

  if (!project || !next) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link
            href="/#work"
            className="min-w-0 truncate font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary"
          >
            [ ← Back to Portfolio ]
          </Link>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 border border-primary bg-primary/10 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-primary"
          >
            [ LIVE SITE ↗ ]
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.categories.map((c) => (
            <Badge key={c}>{c}</Badge>
          ))}
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{project.summary}</p>

        <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-4">
          {[
            ["Client", project.client],
            ["Role", project.role],
            ["Stack", project.badges.join(" · ")],
            ["Timeline", project.timeline],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {k}
              </dt>
              <dd className="mt-1 text-sm">{v}</dd>
            </div>
          ))}
        </dl>

        <PixelWindow
          title={project.liveUrl.replace("https://", "")}
          className="mt-10"
          bodyClassName="p-0"
          accent
        >
          <Image
            src={project.image}
            alt={`${project.title} browser mockup`}
            width={1024}
            height={768}
            preload
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="pixelated w-full object-cover contrast-125"
          />
        </PixelWindow>

        <section className="mt-14">
          <SectionTitle>// 01. KEY_RESULTS</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.results.map((r) => (
              <div key={r.label} className="pixel-border-brand bg-card p-5">
                <p className="pixel-swap text-2xl font-bold text-primary">{r.value}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <SectionTitle>// 02. CHALLENGE</SectionTitle>
          <ul className="space-y-3">
            {project.challenge.map((c) => (
              <li key={c} className="text-sm text-muted-foreground">
                <span className="text-primary">▸</span> {c}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <SectionTitle>// 03. TECHNICAL_EXECUTION</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {project.execution.map((e) => (
              <PixelWindow key={e.title} title="module">
                <h3 className="text-base font-bold">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
              </PixelWindow>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <SectionTitle>// 04. CODE_EXAMPLE</SectionTitle>
          <PixelWindow title={`${project.code.label} · ${project.code.lang}`} bodyClassName="p-0">
            <pre className="scanlines overflow-x-auto bg-background/60 p-4 font-mono text-xs leading-relaxed text-primary">
              <code>{project.code.body}</code>
            </pre>
          </PixelWindow>
        </section>

        <section className="mt-14">
          <SectionTitle>// 05. VISUAL_GALLERY</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {project.gallery.map((g) => (
              <PixelWindow key={g.caption} title={g.caption} bodyClassName="p-0">
                <Image
                  src={g.src}
                  alt={g.caption}
                  width={1024}
                  height={768}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="pixelated w-full object-cover contrast-125 saturate-75"
                />
              </PixelWindow>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <SectionTitle>// 06. LIGHTHOUSE_SCORES</SectionTitle>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {project.lighthouse.map((l) => (
              <div key={l.label} className="pixel-border bg-card p-4 text-center">
                <p className="pixel-swap text-2xl font-bold text-primary">{l.score}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {l.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <Link
            href={`/work/${next.slug}`}
            className="block transition-colors hover:border-primary"
          >
            <PixelWindow title={`next/${next.slug}.case`} accent bodyClassName="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="shrink-0 border-b border-border sm:w-44 sm:border-b-0 sm:border-r md:w-56">
                  <Image
                    src={next.image}
                    alt={`${next.title} preview`}
                    width={1024}
                    height={768}
                    sizes="(min-width: 768px) 224px, 100vw"
                    className="pixelated aspect-[4/3] w-full object-cover contrast-125 saturate-75"
                  />
                </div>
                <div className="flex-1 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Next project
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {next.categories.map((c) => (
                      <Badge key={c}>{c}</Badge>
                    ))}
                  </div>
                  <p className="mt-3 text-xl font-bold">{next.title} →</p>
                  <p className="mt-2 font-mono text-xs text-primary">▸ {next.metric}</p>
                  <span className="mt-5 inline-block border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-foreground">
                    [ Read Case Study → ]
                  </span>
                </div>
              </div>
            </PixelWindow>
          </Link>

          <div className="mt-6">
            <Link
              href="/#work"
              className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-primary"
            >
              [ ← Back to Portfolio ]
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
