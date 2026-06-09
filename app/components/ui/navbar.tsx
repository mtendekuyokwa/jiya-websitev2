import { useState } from "react";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed sm:absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <div className="flex items-center">
        <img src="/logo-dark.svg" alt="Logo" className="h-8 w-auto" />
      </div>
      <button
        className="sm:hidden p-2 text-white/80 hover:text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          {mobileOpen ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          ) : (
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          )}
        </svg>
      </button>
      <nav className="hidden sm:flex items-center space-x-6">
        <a
          href="/"
          className="text-sm text-white/80 hover:text-white transition-colors"
        >
          Home
        </a>
        <a
          href="/about"
          className="text-sm text-white/80 hover:text-white transition-colors"
        >
          About
        </a>
        <a
          href="/contact"
          className="text-sm text-white/80 hover:text-white transition-colors"
        >
          Contact
        </a>
      </nav>
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0A0A0A] border-t border-white/10 sm:hidden">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            <a
              href="/"
              className="text-sm text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </a>
            <a
              href="/about"
              className="text-sm text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              About
            </a>
            <a
              href="/contact"
              className="text-sm text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};
