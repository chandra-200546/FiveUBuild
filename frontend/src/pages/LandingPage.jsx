import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const features = ["AI Code Generation", "Live Preview", "Chat-Based Editing", "Project Management", "Code Editor", "Download Code", "Full Code Ownership", "Supabase Powered"];
const showcases = ["Portfolio Site", "Startup Landing Page", "Admin Dashboard", "SaaS Website", "Product Page", "Personal Blog"];
const faqs = [
  ["Do I own the generated code?", "Yes, you get full ownership and can export anytime."],
  ["Can I edit code manually?", "Yes, use Monaco editors for HTML, CSS, JS, or full code."],
  ["Can I save multiple projects?", "Yes, your dashboard stores and manages all projects."]
];

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Build Full Web Apps From a Single Prompt</h1>
            <p className="mt-5 max-w-xl text-slate-300">FiveUBuild turns your ideas into complete HTML, CSS, and JavaScript apps with live preview, editable code, and one-click download.</p>
            <div className="mt-8 flex gap-3">
              <Link to="/register" className="btn-primary px-6 py-3">Start Building</Link>
              <a href="#how" className="btn-ghost px-6 py-3">View Demo</a>
            </div>
          </div>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="glass rounded-xl p-4">
            <div className="panel p-4">
              <p className="text-sm text-slate-300">Prompt: Build a modern SaaS landing page</p>
              <div className="mt-3 h-56 rounded-lg bg-gradient-to-br from-blue-500/30 via-violet-500/30 to-fuchsia-400/30" />
            </div>
          </motion.div>
        </section>
        <section className="mt-20 grid gap-6 md:grid-cols-2">
          <div className="glass rounded-xl p-6"><h2 className="text-2xl font-semibold">The Idea-to-Code Gap</h2><p className="mt-2 text-slate-300">Teams lose momentum translating ideas into polished code.</p></div>
          <div className="glass rounded-xl p-6"><h2 className="text-2xl font-semibold">AI-Powered Solution</h2><p className="mt-2 text-slate-300">Describe your vision and get complete working app code instantly.</p></div>
        </section>
        <section className="mt-20 grid gap-4 md:grid-cols-4">{features.map((f) => <div className="panel p-4 text-sm" key={f}>{f}</div>)}</section>
        <section className="mt-20 overflow-auto glass rounded-xl p-6">
          <h2 className="text-2xl font-semibold">Comparison</h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead><tr><th>Approach</th><th>Speed</th><th>Flexibility</th><th>Ownership</th></tr></thead>
            <tbody><tr><td>Manual Coding</td><td>Slow</td><td>High</td><td>High</td></tr><tr><td>Templates</td><td>Medium</td><td>Low</td><td>Medium</td></tr><tr><td>No-Code Builders</td><td>Fast</td><td>Low</td><td>Low</td></tr><tr><td>FiveUBuild</td><td>Fast</td><td>High</td><td>High</td></tr></tbody>
          </table>
        </section>
        <section id="how" className="mt-20 grid gap-4 md:grid-cols-4">{["Describe your idea", "AI generates code", "Preview and edit", "Download or save"].map((s, i) => <div className="panel p-4" key={s}><p className="text-xs text-blue-300">Step {i + 1}</p><p className="font-medium">{s}</p></div>)}</section>
        <section className="mt-20 grid gap-4 md:grid-cols-3">{showcases.map((s) => <div key={s} className="panel p-4">{s}</div>)}</section>
        <section className="mt-20 grid gap-4 md:grid-cols-3">{["Free Plan", "Pro Plan", "Founder Plan"].map((p) => <div key={p} className="panel p-6"><h3 className="text-xl font-semibold">{p}</h3></div>)}</section>
        <section className="mt-20">{faqs.map(([q, a]) => <div key={q} className="mb-3 glass rounded-xl p-4"><p className="font-medium">{q}</p><p className="text-slate-300">{a}</p></div>)}</section>
      </main>
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">FiveUBuild</footer>
    </div>
  );
}
