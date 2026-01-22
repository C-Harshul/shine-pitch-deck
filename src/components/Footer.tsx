const Footer = () => {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-12 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-8">
          <a href="#" className="text-xl font-bold tracking-tight">
            Numina
          </a>
          <span className="text-sm text-muted-foreground">
            Real-time financial intelligence
          </span>
        </div>

        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Numina. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
