export default function AuthForm({ title, onSubmit, form, setForm, submitLabel, submitting = false }) {
  return (
    <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-xl p-7 shadow-glass">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">{title}</h1>
      {"name" in form && (
        <input className="field mb-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      )}
      <input className="field mb-3" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="field mb-5" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button disabled={submitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
}
