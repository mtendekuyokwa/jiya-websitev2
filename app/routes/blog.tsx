import type { Route } from "./+types/blog";
import { sortedPosts, formatDate, type Post } from "~/content/posts";
import { ArrowRight } from "~/components/ui/icons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog - Jiya" },
    {
      name: "description",
      content: "How the Jiya team builds a carpooling app for Malawi: engineering, design and product notes.",
    },
  ];
}

export default function Blog() {
  const [featured, ...rest] = sortedPosts;

  return (
    <main className="pb-24 sm:pb-32">
      <section className="pb-14 pt-14 sm:pb-16 sm:pt-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <p className="t-kicker rise">Jiya Blog</p>
          <h1 className="t-hero rise mt-3 max-w-[14ch]" style={{ ["--d" as string]: "60ms" }}>
            How we build Jiya.
          </h1>
          <p className="t-lead rise mt-6 max-w-[36rem] text-ink-2" style={{ ["--d" as string]: "120ms" }}>
            Notes from the team on engineering, design and running a carpool app on
            Malawi’s roads and mobile networks.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <FeaturedCard post={featured} />

        <h2 className="mt-20 text-[22px] font-semibold tracking-[-0.02em]">More posts</h2>
        <ul className="mt-6 grid gap-x-6 gap-y-12 md:grid-cols-2">
          {rest.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function Meta({ post }: { post: Post }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-[14px] text-muted">
      <span className="rounded-full bg-teal-soft px-2.5 py-0.5 font-semibold text-on-teal-soft">{post.category}</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readMinutes} min read</span>
    </p>
  );
}

function FeaturedCard({ post }: { post: Post }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-[2rem] bg-sand md:grid-cols-[1.15fr_1fr]"
    >
      <div className="overflow-hidden">
        <img
          src={post.cover.src}
          alt={post.cover.alt}
          className="aspect-[16/10] h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <Meta post={post} />
        <h2 className="mt-4 text-[clamp(1.6rem,2.6vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em]">
          {post.title}
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-2">{post.summary}</p>
        <span className="mt-7 inline-flex items-center gap-2 font-semibold text-teal">
          Read the post
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <a href={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-[1.5rem]">
        <img
          src={post.cover.src}
          alt={post.cover.alt}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5">
        <Meta post={post} />
        <h3 className="mt-3 text-[22px] font-bold leading-snug tracking-[-0.025em] group-hover:text-teal">
          {post.title}
        </h3>
        <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{post.summary}</p>
      </div>
    </a>
  );
}
