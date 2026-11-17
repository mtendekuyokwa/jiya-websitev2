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

const field =
  "w-full rounded-2xl border border-line-strong bg-surface px-4 text-[17px] text-ink placeholder:text-muted transition-colors hover:border-ink-2 focus:border-teal focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-teal/30";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
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

  return (
    <main className="bg-page px-4 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-44">
      <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h1 className="t-hero">
            Talk to <span className="text-teal">us.</span>
          </h1>
          <p className="mt-6 max-w-[30rem] text-lg text-ink-2">
            A question about a trip, feedback on the app or an idea for working
            together: send it over and a real person will reply.
          </p>
          <p className="mt-8 text-lg">
            <span className="text-muted">Or email </span>
            <a
              href="mailto:info@jiya.mw"
              className="font-semibold text-teal underline decoration-2 underline-offset-4 hover:decoration-transparent"
            >
              info@jiya.mw
            </a>
          </p>
          <img
            src="/images/driver-woman.webp"
            alt="A smiling woman in a striped top driving a car"
            loading="lazy"
            className="mt-12 hidden aspect-[4/3] w-full max-w-[34rem] rounded-[2rem] object-cover lg:block"
          />
        </div>

        {status === "success" ? (
          <div role="status" className="self-start rounded-[2rem] bg-teal p-8 text-on-teal sm:p-12">
            <h2 className="t-hero">Message sent.</h2>
            <p className="mt-4 text-lg font-medium">
              Thanks for writing to us. We’ll reply to {email || "you"} as soon as we can.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 self-start">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block font-semibold">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Chikondi Phiri"
                  className={`${field} h-14`}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`${field} h-14`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block font-semibold">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What is this about?"
                className={`${field} h-14`}
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-semibold">
                Message
              </label>
              <textarea
                id="message"
                rows={7}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us more"
                className={`${field} resize-y py-4`}
              />
            </div>

            {status === "error" && (
              <p role="alert" className="rounded-2xl bg-[#fdecea] px-4 py-3 font-medium text-[#7a1712] dark:bg-[#3a1311] dark:text-[#fecaca]">
                We couldn’t send that: {errorMsg}. Please try again, or email info@jiya.mw.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-teal px-8 text-lg font-bold text-on-teal transition-[background-color,transform] hover:bg-teal-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
