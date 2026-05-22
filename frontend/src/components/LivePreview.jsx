import { useMemo } from "react";

export default function LivePreview({ fullCode }) {
  const srcDoc = useMemo(() => fullCode || "<h1 style='font-family:sans-serif'>No preview yet</h1>", [fullCode]);
  return <iframe title="preview" className="h-[70vh] w-full rounded-lg border border-white/20 bg-white" srcDoc={srcDoc} />;
}
