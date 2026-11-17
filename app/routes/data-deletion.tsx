import { useState } from "react";
import type { Route } from "./+types/data-deletion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Export or delete your data - Jiya" },
    {
      name: "description",
      content: "Request to export or delete your data from Jiya.",
    },
  ];
}

export default function DataDeletion() {
  const [requestType, setRequestType] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/data-deletion-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestType, email, reason }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit");
    }
  }

  const field =
    "w-full rounded-2xl border border-line-strong bg-surface px-4 text-[17px] text-ink placeholder:text-muted transition-colors hover:border-ink-2 focus:border-teal focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-teal/30";

  const options = [
    { value: "export", title: "Export my data", body: "Get a copy of your profile data: name, email and phone number." },
    { value: "delete", title: "Delete my account", body: "Permanently delete your account and everything linked to it. This can’t be undone." },
  ];

  if (status === "success") {
    return (
      <main className="px-5 pb-24 pt-14 sm:px-8 sm:pb-32 sm:pt-20">
        <div role="status" className="mx-auto max-w-[40rem] rounded-[2rem] bg-sand p-8 sm:p-12">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-teal text-on-teal">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
          <h1 className="t-h2 mt-6">Request received</h1>
          <p className="t-lead mt-4 text-ink-2">
            We’ll process it within 30 days and send a confirmation to{" "}
            <strong className="font-semibold text-ink">{email}</strong>.
          </p>
          <a href="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-teal px-6 font-semibold text-on-teal hover:bg-teal-hover">
            Back to the home page
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="px-5 pb-24 pt-14 sm:px-8 sm:pb-32 sm:pt-20">
      <div className="mx-auto max-w-[40rem]">
        <h1 className="t-hero">Export or delete your data</h1>
        <p className="t-lead mt-5 text-ink-2">
          You can ask for a copy of your data, or for your account and its data to be
          deleted. We handle every request within 30 days.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
          <fieldset>
            <legend className="mb-3 font-semibold">What would you like to do?</legend>
            <div className="space-y-3">
              {options.map((o) => (
                <label
                  key={o.value}
                  className="flex cursor-pointer items-start gap-4 rounded-2xl border border-line-strong bg-surface p-5 transition-colors hover:border-ink-2 has-[:checked]:border-teal has-[:checked]:bg-teal-soft has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal"
                >
                  <input
                    type="radio"
                    name="requestType"
                    value={o.value}
                    required
                    checked={requestType === o.value}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="mt-1 h-5 w-5 shrink-0 accent-[var(--teal)]"
                  />
                  <span>
                    <span className="block text-[17px] font-semibold">{o.title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-ink-2">{o.body}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="email" className="mb-2 block font-semibold">
              Email on your Jiya account
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

          <div>
            <label htmlFor="reason" className="mb-2 block font-semibold">
              Reason <span className="font-normal text-ink-2">(optional)</span>
            </label>
            <textarea
              id="reason"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Anything you’d like us to know"
              className={`${field} resize-y py-4`}
            />
          </div>

          {status === "error" && (
            <p role="alert" className="rounded-2xl bg-[#fdecea] px-4 py-3 font-medium text-[#7a1712] dark:bg-[#3a1311] dark:text-[#fecaca]">
              We couldn’t send your request: {errorMsg}. Please try again, or email info@jiya.mw.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-teal px-8 text-lg font-semibold text-on-teal transition-[background-color,transform] hover:bg-teal-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? "Sending…" : "Send request"}
          </button>
        </form>
      </div>
    </main>
  );
}
