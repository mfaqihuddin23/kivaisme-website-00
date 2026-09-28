"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { projects } from "@/data/projects";
import { Badge, PixelWindow, SectionTitle } from "./PixelWindow";

const filters = ["All", "Webflow", "Shopify", "Frontend"] as const;

export function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = projects.filter((p) => filter === "All" || p.categories.includes(filter));

  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <SectionTitle>// 01. SELECTED_PROJECTS</SectionTitle>

        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                filter === f
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {visible.map((p, i) => (
            <PixelWindow
              key={p.slug}
              title={`${p.slug}.case`}
              bodyClassName="p-0"
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <div className="group overflow-hidden border-b border-border">
                <Image
                  src={p.image}
                  alt={`${p.title} preview`}
                  width={1024}
                  height={768}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="pixelated aspect-[4/3] w-full object-cover contrast-125 saturate-50 transition-all duration-300 group-hover:scale-[1.03] group-hover:saturate-150 md:aspect-[16/9]"
                />
              </div>
              <div className="p-5">
                <div className="mb-3 flex flex-wrap gap-2">
                  {p.badges.map((b) => (
                    <Badge key={b}>{b}</Badge>
                  ))}
                </div>
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                <p className="mt-3 font-mono text-xs text-primary">▸ {p.metric}</p>
                <Link
                  href={`/work/${p.slug}`}
                  className="mt-5 inline-block border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  [ Read Case Study → ]
                </Link>
              </div>
            </PixelWindow>
          ))}
        </div>
      </div>
    </section>
  );
}
