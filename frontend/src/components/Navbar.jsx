import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="text-blue-400" size={18} /> FiveUBuild
        </Link>
        <div className="flex gap-3">
          <Link to="/login" className="rounded-lg border border-white/20 px-4 py-2 text-sm">Login</Link>
          <Link to="/register" className="rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2 text-sm font-medium">Start Building</Link>
        </div>
      </div>
    </nav>
  );
}
