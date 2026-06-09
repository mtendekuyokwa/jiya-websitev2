import { useState } from "react";

const faqs = [
  {
    question: "How does Jiya work?",
    answer:
      "Jiya connects drivers with empty seats to passengers traveling the same route. Simply search for your destination, book a seat, and travel together.",
  },
  {
    question: "Is Jiya safe?",
    answer:
      "Safety is our top priority. All users undergo identity verification, rides are tracked in real-time, and our community rating system ensures transparency. We also have 24/7 support for any concerns.",
  },
  {
    question: "How do I book a ride?",
    answer:
      "Bookings are coordinated securely through the app. Simply select your route, confirm your seat, and coordinate directly with the driver.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Yes, you can cancel a booking up to 2 hours before the scheduled departure. Cancellation policies are clearly displayed before you confirm your booking.",
  },
  {
    question: "How do I become a driver?",
    answer:
      "To become a driver, download the app, complete your profile verification, and submit your vehicle documents. Once approved, you can start offering rides.",
  },
];

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left text-white hover:text-yellow-400 transition-colors"
      >
        <span className="font-medium">{question}</span>
        <span
          className={`shrink-0 ml-4 text-gray-500 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "200px" : "0" }}
      >
        <p className="pb-5 text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[var(--color-hero-bg)] py-24">
      <div className="mx-auto max-w-[680px] px-6">
        <div className="text-center mb-16">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Read Manifesto
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Frequently asked questions
          </h2>
          <p className="text-gray-400 mt-4">
            Everything you need to know about Jiya
          </p>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              open={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
