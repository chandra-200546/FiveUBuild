import { supabase } from "../config/supabase.js";
import { generateAppCode, refineAppCode } from "../services/geminiService.js";

export async function generateCode(req, res, next) {
  try {
    const { prompt, projectId } = req.body;
    const code = await generateAppCode(prompt);
    if (projectId) {
      await supabase.from("projects").update({ ...code, prompt, updated_at: new Date().toISOString() }).eq("id", projectId).eq("user_id", req.user.id);
      await supabase.from("chat_messages").insert([{ project_id: projectId, user_id: req.user.id, role: "user", content: prompt }, { project_id: projectId, user_id: req.user.id, role: "assistant", content: "Generated code successfully." }]);
    }
    res.json({ code });
  } catch (err) { next(err); }
}

export async function refineCode(req, res, next) {
  try {
    const { projectId, message } = req.body;
    const { data: project } = await supabase.from("projects").select("html_code,css_code,js_code,full_code").eq("id", projectId).eq("user_id", req.user.id).single();
    const code = await refineAppCode(project, message);
    await supabase.from("projects").update({ ...code, updated_at: new Date().toISOString() }).eq("id", projectId).eq("user_id", req.user.id);
    await supabase.from("chat_messages").insert([{ project_id: projectId, user_id: req.user.id, role: "user", content: message }, { project_id: projectId, user_id: req.user.id, role: "assistant", content: "Refined code successfully." }]);
    res.json({ code });
  } catch (err) { next(err); }
}
