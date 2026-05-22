export default function ChatPanel({ messages, input, setInput, onSend }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 px-3 py-2 text-sm text-slate-300">AI Chat</div>
      <div className="flex-1 space-y-3 overflow-auto p-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[92%] rounded-lg p-3 text-sm ${m.role === "user" ? "ml-auto border border-blue-300/25 bg-blue-500/20" : "border border-white/10 bg-slate-800/80"}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 p-3">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="field h-24 p-2 text-sm" placeholder="Describe what to build or refine..." />
        <button onClick={onSend} className="btn-primary mt-2 w-full">Send</button>
      </div>
    </div>
  );
}
