import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return <div className="grid min-h-screen place-items-center px-4"><div className="text-center"><h1 className="text-5xl font-semibold">404</h1><p className="mt-2 text-slate-300">Page not found.</p><Link to="/" className="mt-5 inline-block rounded-lg border border-white/20 px-4 py-2">Go home</Link></div></div>;
}
