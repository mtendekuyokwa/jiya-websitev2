import { useState } from "react";
import type { Route } from "./+types/data-deletion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Data Deletion - Jiya" },
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

  if (status === "success") {
    return (
      <main className="bg-[var(--color-hero-bg)] min-h-screen">
        <div className="mx-auto max-w-[680px] px-6 pt-24 sm:pt-32 pb-16 sm:pb-24 text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center mx-auto mb-6">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-yellow-400 fill-current"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Request Submitted
          </h1>
          <p className="text-gray-400">
            We have received your request and will process it within 30 days.
            You will receive a confirmation at{" "}
            <span className="text-yellow-400">{email}</span>.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--color-hero-bg)] min-h-screen">
      <div className="mx-auto max-w-[680px] px-6 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="mb-12">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Account
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Data Deletion
          </h1>
          <p className="text-gray-400 mt-4">
            Under Google Play policy, you can request to export or delete your
            data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <fieldset>
            <legend className="text-sm font-semibold text-white uppercase mb-4">
              What would you like to do?
            </legend>
            <div className="space-y-3">
              <label className="flex items-center gap-4 p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <input
                  type="radio"
                  name="requestType"
                  value="export"
                  required
                  checked={requestType === "export"}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-4 h-4 accent-yellow-400"
                />
                <div>
                  <p className="text-sm font-semibold text-white uppercase">
                    Export my data
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Download a copy of my profile data (name, email, phone)
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 border border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <input
                  type="radio"
                  name="requestType"
                  value="delete"
                  required
                  checked={requestType === "delete"}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-4 h-4 accent-yellow-400"
                />
                <div>
                  <p className="text-sm font-semibold text-white uppercase">
                    Delete my account
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Permanently delete my account and all associated data
                  </p>
                </div>
              </label>
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-white uppercase mb-2 block"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="w-full h-11 px-4 rounded-xl border border-white/10 bg-transparent text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-400 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="reason"
              className="text-sm font-semibold text-white uppercase mb-2 block"
            >
              Reason{" "}
              <span className="text-sm font-normal normal-case text-gray-500">
                (optional)
              </span>
            </label>
            <textarea
              id="reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell us why you're requesting this..."
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
            {status === "submitting" ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </main>
  );
}
