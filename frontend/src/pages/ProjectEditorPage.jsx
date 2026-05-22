import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CodeEditor from "../components/CodeEditor";
import LivePreview from "../components/LivePreview";

export default function ProjectEditorPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  useEffect(() => { api.get(`/api/projects/${projectId}`).then((res) => setProject(res.data.project)); }, [projectId]);
  if (!project) return <div className="grid min-h-screen place-items-center">Loading...</div>;
  return <div className="mx-auto max-w-7xl px-6 py-6"><h1 className="mb-3 text-2xl font-semibold">{project.title}</h1><LivePreview fullCode={project.full_code} /><div className="mt-4"><CodeEditor language="html" value={project.full_code} onChange={(v) => setProject({ ...project, full_code: v })} /></div></div>;
}
