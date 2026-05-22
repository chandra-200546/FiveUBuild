import { supabase } from "../config/supabase.js";

export async function me(req, res, next) {
  try {
    const baseName = req.user.email?.split("@")[0] || "User";
    await supabase.from("users").upsert(
      {
        id: req.user.id,
        email: req.user.email,
        name: baseName
      },
      { onConflict: "id" }
    );

    const { data: profile } = await supabase
      .from("users")
      .select("id,name,avatar_url,created_at")
      .eq("id", req.user.id)
      .maybeSingle();

    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        name: profile?.name || baseName,
        avatar_url: profile?.avatar_url || null,
        created_at: profile?.created_at || null
      }
    });
  } catch (err) {
    next(err);
  }
}
