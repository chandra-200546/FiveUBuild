import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../services/supabase";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { name: form.name } }
      });
      if (error) throw error;
      if (!signUpData.session) {
        toast.success("Account created. Verify your email, then log in.");
        nav("/login");
        return;
      }
      const sessionUser = signUpData.user;
      login({
        id: sessionUser.id,
        email: sessionUser.email,
        name: sessionUser.user_metadata?.name || form.name || sessionUser.email?.split("@")[0] || "User",
        avatar_url: sessionUser.user_metadata?.avatar_url || null
      });
      toast.success("Account created");
      nav("/dashboard");
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };
  return <div className="grid min-h-screen place-items-center px-4"><div><AuthForm title="Create FiveUBuild account" form={form} setForm={setForm} onSubmit={submit} submitLabel="Register" submitting={submitting} /><p className="mt-3 text-center text-sm">Already have one? <Link className="text-blue-300" to="/login">Login</Link></p></div></div>;
}
