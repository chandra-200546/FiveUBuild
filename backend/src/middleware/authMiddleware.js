import { supabase } from "../config/supabase.js";

export async function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
  try {
    const token = auth.slice(7);
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return res.status(401).json({ error: "Invalid token" });
    req.user = { id: data.user.id, email: data.user.email };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
