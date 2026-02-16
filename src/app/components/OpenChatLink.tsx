"use client";

export function OpenChatLink() {
  return (
    <button
      type="button"
      onClick={() => document.querySelector<HTMLElement>("[data-chat-toggle]")?.click()}
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:border-zinc-500 hover:bg-zinc-800/50"
    >
      Abrir chat
    </button>
  );
}
