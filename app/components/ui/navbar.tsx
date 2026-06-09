export const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <div className="flex items-center">
        <img src="/logo-dark.svg" alt="Logo" className="h-8 w-auto" />
      </div>
      <nav className="flex items-center space-x-6">
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
    </div>
  );
};
