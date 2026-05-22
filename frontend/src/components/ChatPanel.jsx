export default function ChatPanel({ messages, input, setInput, onSend }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-3 overflow-auto p-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[90%] rounded-lg p-3 text-sm ${m.role === "user" ? "ml-auto bg-blue-600/30" : "bg-slate-800/80"}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 p-3">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="h-24 w-full rounded-lg border border-white/20 bg-slate-900 p-2 text-sm" placeholder="Describe what to build or refine..." />
        <button onClick={onSend} className="mt-2 w-full rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2">Send</button>
      </div>
    </div>
  );
}
