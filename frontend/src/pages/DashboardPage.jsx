import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProjectCard from "../components/ProjectCard";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [renameProject, setRenameProject] = useState(null);
  const [deleteProject, setDeleteProject] = useState(null);
  const nav = useNavigate();
  const { user, logout } = useAuth();

  const load = async () => {
    try {
      setProjects((await api.get("/api/projects")).data.projects);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to load projects");
    }
  };
  useEffect(() => { load(); }, []);

  const createProject = async () => {
    if (!newTitle.trim()) return;
    try {
      const { data } = await api.post("/api/projects", { title: newTitle, prompt: "Build a portfolio website" });
      setNewTitle("");
      toast.success("Project created");
      nav(`/builder/${data.project.id}`);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to create project");
    }
  };

  const filtered = projects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-3xl font-semibold tracking-tight">Welcome, {user?.name}</h1><p className="text-slate-300">Total projects: {projects.length}</p></div>
        <button onClick={() => { logout(); nav("/"); }} className="btn-ghost">Logout</button>
      </div>
      <div className="glass mb-6 rounded-xl p-4">
        <h2 className="mb-2 font-medium">Create New Project</h2>
        <div className="flex gap-2"><input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="field" placeholder="Project title" /><button onClick={createProject} className="btn-primary">Create</button></div>
      </div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} className="field mb-5" placeholder="Search projects..." />
      {filtered.length === 0 ? <div className="panel p-8 text-center text-slate-300">No projects found yet. Create one to get started.</div> : <div className="grid gap-4 md:grid-cols-3">{filtered.map((project) => <ProjectCard key={project.id} project={project} onOpen={(id) => nav(`/builder/${id}`)} onRename={setRenameProject} onDelete={setDeleteProject} />)}</div>}
      {renameProject && <div className="fixed inset-0 grid place-items-center bg-black/50"><div className="glass w-full max-w-md rounded-xl p-4"><h3 className="mb-2 font-medium">Rename Project</h3><input defaultValue={renameProject.title} onChange={(e) => setRenameProject({ ...renameProject, title: e.target.value })} className="field" /><button onClick={async () => { try { await api.put(`/api/projects/${renameProject.id}`, { title: renameProject.title }); setRenameProject(null); load(); } catch (err) { toast.error(err?.response?.data?.error || "Rename failed"); } }} className="btn-primary mt-3">Save</button></div></div>}
      {deleteProject && <div className="fixed inset-0 grid place-items-center bg-black/50"><div className="glass rounded-xl p-4"><h3 className="font-medium">Delete "{deleteProject.title}"?</h3><button onClick={async () => { try { await api.delete(`/api/projects/${deleteProject.id}`); setDeleteProject(null); load(); } catch (err) { toast.error(err?.response?.data?.error || "Delete failed"); } }} className="mt-3 rounded-lg border border-red-400 px-4 py-2 text-red-300">Confirm Delete</button></div></div>}
    </div>
  );
}
