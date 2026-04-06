"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { waUrl } from "@/lib/wa";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const LIVE_CHAT_WELCOME: Message = {
  role: "assistant",
  content:
    "Halo! Saya Live Chat PFS.\nAda yang bisa saya bantu seputar produk atau konsultasi peralatan olahraga?",
};

const WELCOME: Message = {
  role: "assistant",
  content:
    "Halo! Saya Asisten Virtual PFS 👋\nAda yang bisa saya bantu seputar produk atau konsultasi peralatan olahraga?",
};

// ─── Hook: kirim pesan ke API dan stream respons ─────────────────────────────
function useChat() {
  const [messages, setMessages] = useState<Message[]>([LIVE_CHAT_WELCOME]);
  const [loading, setLoading] = useState(false);

  const send = useCallback(async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    // Tambah placeholder kosong untuk respons asisten
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? `Server error ${res.status}`);
      }

      if (!res.body) throw new Error("No stream");

      // Baca stream karakter per karakter — ini yang bikin efek "mengetik"
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Maaf, terjadi gangguan. Silakan coba lagi.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }, [messages]);

  const reset = useCallback(() => setMessages([LIVE_CHAT_WELCOME]), []);

  return { messages, loading, send, reset };
}

// ─── UI Komponen ─────────────────────────────────────────────────────────────
interface ChatPanelProps {
  onClose?: () => void;
  embedded?: boolean; // true = halaman /chat, false = floating widget
}

export function ChatPanel({ onClose, embedded = false }: ChatPanelProps) {
  const { messages, loading, send, reset } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const waLink = waUrl("Halo kak PFS, saya mau konsultasi lebih lanjut 🙏");

  // Auto-scroll ke pesan terbaru — block:"nearest" agar tidak scroll halaman luar
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    send(text);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`flex flex-col bg-white ${
        embedded
          ? "h-full w-full"
          : "h-[480px] w-80 rounded-2xl shadow-2xl border border-zinc-200"
      }`}
    >
      {/* Header — disembunyikan di halaman /chat karena sudah ada header sendiri */}
      <div className={`flex items-center justify-between bg-gradient-to-r from-sky-600 to-sky-700 px-4 py-3 ${embedded ? "hidden" : "rounded-t-2xl"}`}>
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm">
            🏆
          </div>
          <div>
            <p className="text-xs font-bold text-white">Asisten PFS</p>
            <p className="text-[10px] text-sky-200">Konsultasi Peralatan Olahraga</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={reset}
            title="Reset chat"
            className="rounded-full p-1.5 text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-white/70 transition hover:bg-white/20 hover:text-white"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "rounded-br-sm bg-sky-600 text-white"
                  : "rounded-bl-sm bg-zinc-100 text-zinc-800"
              }`}
            >
              {msg.content}
              {msg.role === "assistant" && loading && i === messages.length - 1 && (
                <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-zinc-400" />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* WA CTA */}
      <div className="border-t border-zinc-100 px-3 py-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-1.5 text-[11px] font-bold text-white transition hover:bg-[#20b558]"
        >
          <svg viewBox="0 0 24 24" fill="white" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Lanjut Konsultasi via WhatsApp
        </a>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-zinc-100 px-3 py-2.5">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Tanya seputar produk PFS..."
          disabled={loading}
          className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-800 placeholder-zinc-400 outline-none transition focus:border-sky-400 focus:bg-white disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-40"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Floating Button + Widget ─────────────────────────────────────────────────
export function ChatFloatWidget() {
  const pathname                      = usePathname();
  const [open, setOpen]               = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Tooltip max 3x per sesi (sessionStorage) — muncul 1x tiap pindah halaman
  useEffect(() => {
    const MAX   = 3;
    const KEY   = "pfs_tooltip_count";
    const count = parseInt(sessionStorage.getItem(KEY) ?? "0", 10);

    if (count >= MAX) return; // sudah 3x sesi ini, berhenti

    let hideId: ReturnType<typeof setTimeout>;

    const showId = setTimeout(() => {
      setShowTooltip(true);
      sessionStorage.setItem(KEY, String(count + 1));
      hideId = setTimeout(() => setShowTooltip(false), 6000);
    }, 2000);

    return () => {
      clearTimeout(showId);
      clearTimeout(hideId);
    };
  }, []);

  const handleOpen = () => {
    setOpen((v) => !v);
    setShowTooltip(false);
  };

  if (pathname === "/chat") return null;

  return (
    <div className="fixed bottom-[5.5rem] right-7 z-50 sm:bottom-24 sm:right-6">
      {/* Chat Panel */}
      <div
        className={`absolute bottom-16 right-0 transition-all duration-300 origin-bottom-right ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <ChatPanel onClose={() => setOpen(false)} />
      </div>

      {/* Tooltip "Ada yang bisa kami bantu?" */}
      <div
        className={`absolute bottom-2 right-14 flex items-center transition-all duration-500 ${
          showTooltip && !open
            ? "translate-x-0 opacity-100"
            : "translate-x-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative whitespace-nowrap rounded-2xl bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-lg">
          💬 Ada yang bisa kami bantu?
          {/* Panah ke kanan */}
          <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-zinc-900" />
        </div>
      </div>

      {/* Tombol bubble + animasi ping */}
      <div className="relative">
        {/* Ping dot — indikator aktif */}
        {!open && (
          <span className="absolute right-0 top-0 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500" />
          </span>
        )}
        <button
          type="button"
          onClick={handleOpen}
          aria-label={open ? "Tutup asisten PFS" : "Buka asisten PFS"}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg transition hover:bg-sky-700 hover:scale-110 active:scale-95"
        >
          {open ? (
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223 15.89 15.89 0 002-.169z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
