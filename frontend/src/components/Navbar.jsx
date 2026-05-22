import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Sparkles className="text-blue-400" size={18} /> FiveUBuild
        </Link>
        <div className="flex gap-3">
          <Link to="/login" className="btn-ghost text-sm">Login</Link>
          <Link to="/register" className="btn-primary text-sm">Start Building</Link>
        </div>
      </div>
    </nav>
  );
}
