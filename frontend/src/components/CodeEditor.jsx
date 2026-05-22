import Editor from "@monaco-editor/react";

export default function CodeEditor({ language, value, onChange }) {
  return <Editor height="70vh" theme="vs-dark" language={language} value={value} onChange={(v) => onChange(v || "")} />;
}
