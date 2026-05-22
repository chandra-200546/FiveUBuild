import { Pencil, Trash2, FolderOpen } from "lucide-react";

export default function ProjectCard({ project, onOpen, onRename, onDelete }) {
  return (
    <div className="panel p-4">
      <h3 className="font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-300">{project.description || "No description"}</p>
      <p className="mt-3 text-xs text-slate-400">{new Date(project.created_at).toLocaleDateString()}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => onOpen(project.id)} className="btn-primary text-sm"><FolderOpen size={14} className="mr-1 inline" /> Open</button>
        <button onClick={() => onRename(project)} className="btn-ghost px-3 py-2 text-sm"><Pencil size={14} className="inline" /></button>
        <button onClick={() => onDelete(project)} className="rounded-lg border border-red-400/50 bg-red-500/10 px-3 py-2 text-sm text-red-300"><Trash2 size={14} className="inline" /></button>
      </div>
    </div>
  );
}
