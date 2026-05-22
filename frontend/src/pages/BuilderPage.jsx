import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ChatPanel from "../components/ChatPanel";
import CodeEditor from "../components/CodeEditor";
import LivePreview from "../components/LivePreview";
import api from "../services/api";

const EXAMPLE_PROMPTS = ["Build a portfolio website", "Create a SaaS landing page", "Make an admin dashboard", "Design a restaurant website"];

export default function BuilderPage() {
  const { projectId } = useParams();
  const nav = useNavigate();
  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("preview");

  const load = async () => {
    const { data } = await api.get(`/api/projects/${projectId}`);
    setProject(data.project);
    setMessages(data.messages || []);
  };
  useEffect(() => { load(); }, [projectId]);

  const send = async () => {
    if (!input.trim()) return;
    try {
      const msg = { role: "user", content: input };
      setMessages((m) => [...m, msg]);
      if (!project?.full_code) {
        const { data } = await api.post("/api/ai/generate", { prompt: input, projectId });
        setProject((p) => ({ ...p, ...data.code }));
        toast.success("Project generated");
      } else {
        const { data } = await api.post("/api/ai/refine", { projectId, message: input });
        setProject((p) => ({ ...p, ...data.code }));
        toast.success("Project refined");
      }
      setMessages((m) => [...m, { role: "assistant", content: "Code updated in workspace." }]);
      setInput("");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to process request");
    }
  };

  const save = async () => {
    try {
      await api.put(`/api/projects/${projectId}`, {
        html_code: project.html_code,
        css_code: project.css_code,
        js_code: project.js_code,
        full_code: project.full_code,
        description: project.description,
        title: project.title
      });
      toast.success("Changes saved");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Save failed");
    }
  };

  const download = async () => {
    try {
      const response = await api.get(`/api/projects/${projectId}/download`, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(project.title || "fiveubuild-project").replace(/\s+/g, "-").toLowerCase()}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Download failed");
    }
  };

  if (!project) return <div className="grid min-h-screen place-items-center">Loading...</div>;
  return (
    <div className="grid min-h-screen grid-cols-1 gap-2 p-2 xl:grid-cols-12">
      <aside className="glass xl:col-span-2 rounded-xl p-3">
        <button onClick={() => nav("/dashboard")} className="btn-ghost mb-3 w-full text-sm">Back</button>
        <h3 className="font-medium">Examples</h3>
        <div className="mt-2 space-y-2">{EXAMPLE_PROMPTS.map((p) => <button key={p} onClick={() => setInput(p)} className="btn-ghost w-full px-2 py-2 text-left text-xs">{p}</button>)}</div>
      </aside>
      <section className="glass xl:col-span-4 rounded-xl"><ChatPanel messages={messages} input={input} setInput={setInput} onSend={send} /></section>
      <section className="glass xl:col-span-6 rounded-xl p-3">
        <div className="mb-3 flex flex-wrap gap-2">
          {["preview", "html", "css", "js", "full"].map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-3 py-2 text-sm ${tab === t ? "bg-blue-600 text-white" : "border border-white/20 bg-slate-900/70"}`}>{t.toUpperCase()}</button>)}
          <button onClick={save} className="btn-primary ml-auto text-sm">Save</button>
          <button onClick={download} className="btn-ghost text-sm">Download</button>
        </div>
        {tab === "preview" && <LivePreview fullCode={project.full_code} />}
        {tab === "html" && <CodeEditor language="html" value={project.html_code || ""} onChange={(v) => setProject({ ...project, html_code: v })} />}
        {tab === "css" && <CodeEditor language="css" value={project.css_code || ""} onChange={(v) => setProject({ ...project, css_code: v })} />}
        {tab === "js" && <CodeEditor language="javascript" value={project.js_code || ""} onChange={(v) => setProject({ ...project, js_code: v })} />}
        {tab === "full" && <CodeEditor language="html" value={project.full_code || ""} onChange={(v) => setProject({ ...project, full_code: v })} />}
      </section>
    </div>
  );
}
