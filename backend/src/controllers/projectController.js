import { supabase } from "../config/supabase.js";

export async function getProjects(req, res, next) {
  try {
    const { data, error } = await supabase.from("projects").select("*").eq("user_id", req.user.id).order("updated_at", { ascending: false });
    if (error) throw error;
    res.json({ projects: data });
  } catch (err) { next(err); }
}

export async function createProject(req, res, next) {
  try {
    const { title, prompt } = req.body;
    const { data, error } = await supabase.from("projects").insert({ user_id: req.user.id, title, prompt }).select("*").single();
    if (error) throw error;
    res.status(201).json({ project: data });
  } catch (err) { next(err); }
}

export async function getProject(req, res, next) {
  try {
    const { data: project, error } = await supabase.from("projects").select("*").eq("id", req.params.id).eq("user_id", req.user.id).single();
    if (error) throw error;
    const { data: messages } = await supabase.from("chat_messages").select("*").eq("project_id", req.params.id).order("created_at");
    res.json({ project, messages: messages || [] });
  } catch (err) { next(err); }
}

export async function updateProject(req, res, next) {
  try {
    const patch = { ...req.body, updated_at: new Date().toISOString() };
    const { data, error } = await supabase.from("projects").update(patch).eq("id", req.params.id).eq("user_id", req.user.id).select("*").single();
    if (error) throw error;
    res.json({ project: data });
  } catch (err) { next(err); }
}

export async function deleteProject(req, res, next) {
  try {
    const { error } = await supabase.from("projects").delete().eq("id", req.params.id).eq("user_id", req.user.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) { next(err); }
}

export async function downloadProject(req, res, next) {
  try {
    const { data, error } = await supabase.from("projects").select("title,full_code").eq("id", req.params.id).eq("user_id", req.user.id).single();
    if (error) throw error;
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Disposition", `attachment; filename="${data.title.replace(/\s+/g, "-").toLowerCase()}.html"`);
    res.send(data.full_code || "");
  } catch (err) { next(err); }
}
