import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useMemo, useState } from "react";
import { buildNotices } from "@/lib/notices";
import { usePublishedReport } from "@/lib/published-report";
import { usePersonal } from "@/lib/store";
import { cn } from "@/lib/cn";

export function NoticeBell({ compact = false }: { compact?: boolean }) {
  const report = usePublishedReport((s) => s.report);
  const decisions = usePersonal((s) => s.proposalDecisions);
  const events = usePersonal((s) => s.personalEvents);
  const read = usePersonal((s) => s.readNoticeIds);
  const markNoticeRead = usePersonal((s) => s.markNoticeRead);
  const markNoticesRead = usePersonal((s) => s.markNoticesRead);
  const [open, setOpen] = useState(false);
  const notices = useMemo(() => buildNotices({ report, decisions, events }), [report, decisions, events]);
  const unread = notices.filter((notice) => !read.includes(notice.id)).length;

  return (
    <div className="relative">
      <button
        type="button"
        className="press relative"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Bell className="size-4" aria-hidden />
        <span className={compact ? "sr-only" : "hidden md:inline"}>Notices</span>
        {unread > 0 ? (
          <span className="min-w-[1.25rem] rounded-full bg-accent px-1.5 text-center font-mono text-[0.65rem] font-bold leading-5 text-onaccent tabular-nums">
            {unread > 99 ? "99+" : unread}
          </span>
        ) : null}
      </button>
      {open ? (
        <div className="absolute top-full right-0 z-40 mt-1 w-[min(24rem,calc(100vw-2rem))] border-[3px] border-ink bg-paper shadow-[4px_4px_0_0_var(--color-ink)]">
          <div className="flex items-center justify-between gap-2 border-b-[3px] border-ink px-3 py-2">
            <div>
              <p className="font-mono text-[0.65rem] tracking-widest text-mute">IN-APP · NOT BROWSER PUSH</p>
              <p className="font-mono text-[0.65rem] tracking-widest text-ink">
                {unread > 0 ? `${unread} UNREAD` : "ALL CAUGHT UP"}
                {notices.length > 12 ? ` · SHOWING 12/${notices.length}` : ""}
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 font-mono text-xs underline underline-offset-2"
              onClick={() => markNoticesRead(notices.map((notice) => notice.id))}
            >
              MARK READ
            </button>
          </div>
          {notices.length === 0 ? (
            <p className="px-3 py-4 text-sm">No notices. A quiet desk is not a successful verification.</p>
          ) : (
            <ul className="max-h-[min(24rem,70vh)] overflow-auto">
              {notices.slice(0, 12).map((notice) => {
                const seen = read.includes(notice.id);
                return (
                  <li key={notice.id} className={cn("border-b border-ink", seen && "opacity-60")}>
                    <Link
                      to={notice.href}
                      className="block px-3 py-3 hover:bg-panel"
                      onClick={() => {
                        markNoticeRead(notice.id);
                        setOpen(false);
                      }}
                    >
                      <p className={cn("font-mono text-xs tracking-widest", notice.tone === "unverified" ? "text-signal" : notice.tone === "confirmed" ? "text-accent" : "text-mute")}>
                        {notice.tone === "confirmed" ? "CONFIRMED" : notice.tone === "unverified" ? "UNVERIFIED" : "REMINDER"}
                      </p>
                      <p className="mt-1 font-display text-xl font-bold uppercase leading-none">{notice.title}</p>
                      <p className="mt-1 text-sm">{notice.body}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
