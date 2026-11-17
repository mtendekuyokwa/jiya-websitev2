import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { useEffect } from "react";
import "lenis/dist/lenis.css";
import "@fontsource-variable/libre-franklin/wght.css";
import "@fontsource-variable/libre-franklin/wght-italic.css";
import "./app.css";
import { Navbar } from "./components/ui/navbar";
import { Footer } from "./components/footer/footer";

export const links: Route.LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fefcf8" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#11110f" />
        <script
          // Apply a saved theme before first paint so there is no flash of the wrong theme.
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("jiya-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        <meta name="google-site-verification" content="arHvD01bN1Ev0mYD29wrtKsqlWPyY9giREgXDZ_YH4k" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        <div id="main" tabIndex={-1} className="outline-none">
          {children}
        </div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useSmoothScroll();
  return <Outlet />;
}

/** Inertial scrolling for a calmer feel. Off when the visitor prefers reduced motion. */
function useSmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | undefined;
    let raf = 0;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.12 });
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      const loop = (t: number) => {
        lenis!.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-[70vh] px-4 sm:px-8 pt-36 pb-24 mx-auto max-w-3xl">
      <p className="t-kicker">Something went wrong</p>
      <h1 className="t-hero mt-3">{message}</h1>
      <p className="t-lead mt-5 text-ink-2">{details}</p>
      <a href="/" className="mt-10 inline-flex min-h-12 items-center rounded-full bg-teal px-6 font-semibold text-on-teal hover:bg-teal-hover">Back to the home page</a>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
