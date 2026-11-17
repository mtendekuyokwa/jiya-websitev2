import { data } from "react-router";
import type { Route } from "./+types/blog-post";
import { posts, sortedPosts, formatDate, type Block } from "~/content/posts";
import { PostCard } from "./blog";

export function loader({ params }: Route.LoaderArgs) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) throw data("Post not found", { status: 404 });
  return { slug: post.slug };
}

export function meta({ data: d }: Route.MetaArgs) {
  const post = posts.find((p) => p.slug === d?.slug);
  if (!post) return [{ title: "Post not found - Jiya" }];
  return [
    { title: `${post.title} - Jiya Blog` },
    { name: "description", content: post.summary },
    { property: "og:title", content: post.title },
    { property: "og:description", content: post.summary },
    { property: "og:image", content: post.cover.src },
    { property: "og:type", content: "article" },
  ];
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const post = posts.find((p) => p.slug === loaderData.slug)!;
  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="pb-24 sm:pb-32">
      <article>
        <header className="mx-auto max-w-[46rem] px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
          <a href="/blog" className="-ml-2 inline-flex min-h-11 items-center rounded-full px-2 text-[15px] font-semibold text-teal hover:underline">
            ← All posts
          </a>
          <p className="mt-8 flex flex-wrap items-center gap-x-2 text-[14px] text-muted">
            <span className="rounded-full bg-teal-soft px-2.5 py-0.5 font-semibold text-on-teal-soft">{post.category}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readMinutes} min read</span>
          </p>
          <h1 className="mt-5 text-[clamp(2.1rem,4.6vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.035em]">
            {post.title}
          </h1>
          <p className="t-lead mt-5 text-ink-2">{post.summary}</p>
          <p className="mt-6 text-[15px] font-semibold">{post.author}</p>
        </header>

        <div className="px-3 sm:px-5">
          <img
            src={post.cover.src}
            alt={post.cover.alt}
            className="mx-auto aspect-[2/1] w-full max-w-[64rem] rounded-[2rem] object-cover"
          />
        </div>

        <div className="mx-auto mt-14 max-w-[46rem] px-5 sm:px-8">
          {post.body.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}
        </div>
      </article>

      {more.length > 0 && (
        <aside aria-labelledby="more-title" className="mx-auto mt-24 max-w-[1200px] px-5 sm:px-8">
          <h2 id="more-title" className="text-[22px] font-semibold tracking-[-0.02em]">Keep reading</h2>
          <ul className="mt-6 grid gap-x-6 gap-y-12 md:grid-cols-2">
            {more.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </aside>
      )}
    </main>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="mt-6 text-[18px] leading-[1.75] text-ink-2 first:mt-0">{block.text}</p>;
    case "h2":
      return <h2 className="mt-14 text-[26px] font-bold leading-tight tracking-[-0.025em]">{block.text}</h2>;
    case "ul":
      return (
        <ul className="mt-6 space-y-3 text-[18px] leading-[1.7] text-ink-2">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
              {it}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <figure className="mt-8">
          <pre tabIndex={0} role="region" aria-label={block.caption ? `Code: ${block.caption}` : "Code sample"} className="overflow-x-auto rounded-[1.25rem] bg-[#171614] p-5 text-[14px] leading-[1.65] text-[#ede5d8] sm:p-6">
            <code className="font-mono">{block.code}</code>
          </pre>
          {block.caption && (
            <figcaption className="mt-3 font-mono text-[13px] text-muted">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "note":
      return (
        <p className="mt-10 rounded-[1.25rem] bg-sand px-6 py-5 text-[17px] text-ink">
          {block.text}
          {block.link && (
            <>
              {" "}
              <a href={block.link.href} className="font-semibold text-teal underline decoration-1 underline-offset-4 hover:decoration-2">
                {block.link.label}
              </a>
            </>
          )}
        </p>
      );
  }
}
