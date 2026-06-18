function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-xs font-bold uppercase tracking-[0.25em] text-base-content/50 md:flex-row md:items-center md:justify-between">
        <p>© 2024 Shortlink. The Digital Architect.</p>

        <div className="flex flex-wrap gap-6">
          <a className="hover:text-primary">Privacy Policy</a>
          <a className="hover:text-primary">Terms of Service</a>
          <a className="hover:text-primary">API Documentation</a>
          <a className="hover:text-primary">Support</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
