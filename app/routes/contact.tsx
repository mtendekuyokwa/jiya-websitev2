import { useState } from "react";
import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact - Jiya" },
    {
      name: "description",
      content:
        "Get in touch with the Jiya team. We're here to help with questions, feedback, or support.",
    },
  ];
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  }

  if (status === "success") {
    return (
      <main className="bg-[var(--color-hero-bg)] min-h-screen">
        <div className="mx-auto max-w-[680px] px-6 pt-32 pb-24 text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center mx-auto mb-6">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-yellow-400 fill-current"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Message Sent
          </h1>
          <p className="text-gray-400">
            Thank you for reaching out. We&apos;ll get back to you as soon as
            possible.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--color-hero-bg)] min-h-screen">
      <div className="mx-auto max-w-[680px] px-6 pt-32 pb-24">
        <div className="mb-12">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Contact
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Get in Touch
          </h1>
          <p className="text-gray-400 mt-4">
            Have a question, feedback, or need help? We&apos;d love to hear from
            you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-semibold text-white uppercase mb-2 block"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full h-11 px-4 rounded-xl border border-white/10 bg-transparent text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-400 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-white uppercase mb-2 block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full h-11 px-4 rounded-xl border border-white/10 bg-transparent text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-400 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="text-sm font-semibold text-white uppercase mb-2 block"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What is this about?"
              className="w-full h-11 px-4 rounded-xl border border-white/10 bg-transparent text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-400 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-sm font-semibold text-white uppercase mb-2 block"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more..."
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-transparent text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-400 text-sm resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-red-400 text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full h-11 text-sm font-semibold uppercase px-6 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-16 pt-12 border-t border-white/5">
          <h2 className="text-sm font-semibold text-white uppercase mb-4">
            Or reach us at
          </h2>
          <a
            href="mailto:info@jiya.mw"
            className="text-yellow-400 hover:underline text-sm"
          >
            info@jiya.mw
          </a>

          <div className="flex items-center gap-5 mt-6">
            <a
              href="#"
              className="text-gray-500 hover:text-yellow-400 transition-colors"
              aria-label="Twitter"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-yellow-400 transition-colors"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-yellow-400 transition-colors"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
