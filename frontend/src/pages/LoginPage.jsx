import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabase";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
      if (error) throw error;
      const sessionUser = data?.user;
      login({
        id: sessionUser.id,
        email: sessionUser.email,
        name: sessionUser.user_metadata?.name || sessionUser.email?.split("@")[0] || "User",
        avatar_url: sessionUser.user_metadata?.avatar_url || null
      });
      toast.success("Welcome back");
      nav("/dashboard");
    } catch (err) {
      toast.error(err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };
  return <div className="grid min-h-screen place-items-center px-4"><div><AuthForm title="Login to FiveUBuild" form={form} setForm={setForm} onSubmit={submit} submitLabel="Login" submitting={submitting} /><p className="mt-3 text-center text-sm">New here? <Link className="text-blue-300" to="/register">Create account</Link></p></div></div>;
}
