import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-tight">
          Numina
        </a>

        <button className="btn-ghost text-xs px-4 py-2 group">
          Join Beta
          <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
