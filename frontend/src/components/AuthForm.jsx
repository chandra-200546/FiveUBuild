export default function AuthForm({ title, onSubmit, form, setForm, submitLabel, submitting = false }) {
  return (
    <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-2xl p-6 shadow-glass">
      <h1 className="mb-6 text-2xl font-semibold">{title}</h1>
      {"name" in form && (
        <input className="mb-3 w-full rounded-lg border border-white/20 bg-slate-900 px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      )}
      <input className="mb-3 w-full rounded-lg border border-white/20 bg-slate-900 px-3 py-2" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="mb-5 w-full rounded-lg border border-white/20 bg-slate-900 px-3 py-2" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button disabled={submitting} className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
}
