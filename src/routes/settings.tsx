import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { EVIDENCE_COPY } from "@/data/circulars";
import { SYSTEM_LABEL, TRACK_LABEL, type Track } from "@/data/types";
import { Signature } from "@/components/signature";
import { applyNaughty, resolveNaughty } from "@/components/theme";
import { PageHead, TextButton, controlClass } from "@/components/marks";
import { blankCircular, blankUniversity, buildCatalog, useCatalog } from "@/lib/catalog";
import { todayISO } from "@/lib/dates";
import { parseBackup, personalSnapshot, usePersonal } from "@/lib/store";
import { useT } from "@/lib/i18n";
import {
  disableDeskPush,
  enableDeskPush,
  getPushPermission,
  isPushEnabled,
  pushSupported,
  type PushPermission,
} from "@/lib/desk-push";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — ADMISSION//26" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const t = useT();
  const personal = usePersonal();
  const catalog = useCatalog();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [uniName, setUniName] = useState("");
  const [uniShort, setUniShort] = useState("");
  const [uniTrack, setUniTrack] = useState<Track>("general");
  const [uniCity, setUniCity] = useState("");
  const [uniSite, setUniSite] = useState("");
  const [circUni, setCircUni] = useState(catalog.universities[0]?.id ?? "du");
  const [circTitle, setCircTitle] = useState("");

  const download = (filename: string, payload: unknown) => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const exportDesk = () => {
    download(`admission26-desk-${todayISO()}.json`, {
      archive: "ADMISSION//26",
      version: 2,
      exportedAt: new Date().toISOString(),
      personal: personalSnapshot(personal),
    });
    setMessage("Desk backup downloaded.");
  };

  const exportMerged = () => {
    download(`admission26-catalog-${todayISO()}.json`, {
      archive: "ADMISSION//26",
      kind: "snapshot",
      exportedAt: new Date().toISOString(),
      universities: catalog.universities,
      circulars: catalog.circulars,
    });
    setMessage("Merged catalog snapshot downloaded. This file is for reading, not for import.");
  };

  const onImport = async (file: File | undefined) => {
    if (!file) return;
    try {
      const parsed = parseBackup(JSON.parse(await file.text()));
      if (!parsed) {
        setMessage("That file is not an ADMISSION//26 desk backup. Snapshots cannot be imported.");
        return;
      }
      personal.replacePersonal(parsed);
      setMessage("Desk backup restored on this browser.");
    } catch {
      setMessage("Could not read that JSON file.");
    }
  };

  return (
    <div>
      <PageHead
        kicker={t("set.kicker")}
        title={t("set.title")}
        lede={t("set.lede")}
      />

      <section className="border border-ink p-4">
        <h2 className="font-display text-3xl font-bold uppercase">{t("set.howRead")}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {EVIDENCE_COPY.map((line) => (
            <li key={line} className="border-b border-ink py-2">
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          The directory was logged on 4 Nov 2026 from the UGC public-university list and three Daily Star reports. It does not scrape the web. If a portal is down, the field stays blank.
        </p>
      </section>

      <section className="mt-8 border border-ink p-4">
        <h2 className="font-display text-3xl font-bold uppercase">{t("set.backup")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <TextButton onClick={exportDesk}>{t("set.exportDesk")}</TextButton>
          <TextButton tone="paper" onClick={exportMerged}>
            {t("set.exportMerged")}
          </TextButton>
          <TextButton
            tone="ghost"
            onClick={() => {
              if (confirm("Erase bookmarks, notes, tracker marks and desk amendments on this browser?")) {
                personal.resetPersonal();
                setMessage("Local desk cleared. The seeded directory is unchanged.");
              }
            }}
          >
            {t("set.resetDesk")}
          </TextButton>
        </div>
        <label className="mt-4 flex flex-col gap-2">
          <span className="font-mono text-xs tracking-widest text-mute">{t("set.import")}</span>
          <input
            type="file"
            accept="application/json"
            className={controlClass}
            onChange={(event) => void onImport(event.target.files?.[0])}
          />
        </label>
        {message ? <p className="mt-3 font-mono text-xs">{message}</p> : null}
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <form
          className="border border-ink p-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!uniName.trim()) {
              setMessage("A university needs a name.");
              return;
            }
            if (uniSite.trim() && !/^https?:\/\//i.test(uniSite.trim())) {
              setMessage("Website must start with http:// or https://");
              return;
            }
            const uni = blankUniversity(uniName);
            uni.shortName = uniShort.trim() || uni.shortName;
            uni.track = uniTrack;
            uni.city = uniCity.trim();
            uni.website = uniSite.trim() || null;
            personal.addUniversity(uni);
            setUniName("");
            setUniShort("");
            setUniCity("");
            setUniSite("");
            void navigate({ to: "/universities/$id", params: { id: uni.id } });
          }}
        >
          <h2 className="font-display text-3xl font-bold uppercase">{t("set.addUni")}</h2>
          <div className="mt-4 grid gap-3">
            <input className={controlClass} placeholder="University name" value={uniName} onChange={(e) => setUniName(e.target.value)} />
            <input className={controlClass} placeholder="Short name" value={uniShort} onChange={(e) => setUniShort(e.target.value)} />
            <select className={controlClass} value={uniTrack} onChange={(e) => setUniTrack(e.target.value as Track)}>
              {(Object.keys(TRACK_LABEL) as Track[]).map((track) => (
                <option key={track} value={track}>
                  {TRACK_LABEL[track]}
                </option>
              ))}
            </select>
            <input className={controlClass} placeholder="City" value={uniCity} onChange={(e) => setUniCity(e.target.value)} />
            <input className={controlClass} placeholder="https:// official website" value={uniSite} onChange={(e) => setUniSite(e.target.value)} />
            <TextButton type="submit">{t("set.addUniBtn")}</TextButton>
          </div>
        </form>

        <form
          className="border border-ink p-4"
          onSubmit={(event) => {
            event.preventDefault();
            const circular = blankCircular(circUni, circTitle);
            const uni = catalog.byId.get(circUni);
            if (uni?.track === "engineering") circular.system = "engineering";
            if (uni?.track === "private") circular.system = "private";
            if (uni?.track === "medical") circular.system = "medical";
            if (uni?.track === "agricultural") circular.system = "agricultural";
            if (uni?.id === "gst") circular.system = "gst";
            personal.addCircular(circular);
            setCircTitle("");
            void navigate({ to: "/circulars/$id", params: { id: circular.id } });
          }}
        >
          <h2 className="font-display text-3xl font-bold uppercase">{t("set.addCirc")}</h2>
          <div className="mt-4 grid gap-3">
            <select className={controlClass} value={circUni} onChange={(e) => setCircUni(e.target.value)}>
              {catalog.universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.shortName} — {uni.name}
                </option>
              ))}
            </select>
            <input className={controlClass} placeholder="Title" value={circTitle} onChange={(e) => setCircTitle(e.target.value)} />
            <p className="font-mono text-xs text-mute">
              Systems on file: {Object.values(SYSTEM_LABEL).join(" · ")}. You will set dates on the next screen. Leave unknown fields blank.
            </p>
            <TextButton type="submit">{t("set.addCircBtn")}</TextButton>
          </div>
        </form>
      </section>

      <DeskAlertsPanel />

      <Signature variant="about" />

      <SeedCount />

      {/* Creator-only desk experiment — buried on purpose */}
      <DeskExperiment />
    </div>
  );
}

function DeskAlertsPanel() {
  const [enabled, setEnabled] = useState(false);
  const [permission, setPermission] = useState<PushPermission>("default");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    setEnabled(isPushEnabled());
    setPermission(getPushPermission());
  }, []);

  const turnOn = async () => {
    setBusy(true);
    setNote("");
    const result = await enableDeskPush();
    setPermission(result.permission);
    setEnabled(result.ok);
    setBusy(false);
    if (result.ok) {
      setNote("Alerts on. You should get a welcome notification now. News + registration opens will ping this device.");
    } else if (result.permission === "denied") {
      setNote("Permission blocked. Open browser site settings and allow notifications for this origin.");
    } else if (result.permission === "unsupported") {
      setNote("This browser does not support notifications.");
    } else {
      setNote("Permission not granted yet.");
    }
  };

  const turnOff = () => {
    disableDeskPush();
    setEnabled(false);
    setNote("Alerts off on this device.");
  };

  const fireScream = async () => {
    setBusy(true);
    setNote("Firing frantic stack…");
    try {
      const result = await screamNow();
      setEnabled(true);
      setPermission(getPushPermission());
      if (result.fired > 0) {
        setNote(
          `Fired ${result.fired} notification(s). Device date ${result.today}. Moments: ${result.moments.join(", ") || "—"}. Check Windows notification center / Focus assist.`,
        );
      } else {
        setNote(
          `Fired 0. Date ${result.today}. Errors: ${result.errors.join(", ") || "unknown"}. Check browser site settings → Notifications, and Windows Focus assist.`,
        );
      }
    } catch (e) {
      setNote(`Scream failed: ${e instanceof Error ? e.message : "unknown"}`);
    }
    setBusy(false);
  };

  return (
    <section className="mt-8 border-[3px] border-ink bg-panel p-4 shadow-[4px_4px_0_0_var(--color-ink)]">
      <p className="font-mono text-[10px] tracking-widest text-accent">PHONE / PC SHORTCUT · OS NOTIFICATIONS</p>
      <h2 className="mt-1 font-display text-3xl font-bold uppercase leading-none">Desk alerts</h2>
      <p className="mt-2 max-w-2xl text-sm text-pretty">
        For people who installed ADMISSION//26 on the home screen or pinned it. When the news desk flips, you get{" "}
        <strong>NEW NEWS · headline</strong>. On registration / exam / close days you get a{" "}
        <strong>4–5 ping frantic stack</strong> (e.g. KUEEEET ADMISSION REGISTRATION AHHHHHHHH&gt;&gt;&gt;&gt;!!!!!!).
      </p>
      <p className="mt-2 font-mono text-[11px] text-mute">
        Status: {pushSupported() ? `permission ${permission}` : "unsupported"} · {enabled ? "ENABLED" : "OFF"}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {!enabled ? (
          <TextButton type="button" disabled={busy || !pushSupported()} onClick={() => void turnOn()}>
            {busy ? "Asking…" : "Turn on desk alerts"}
          </TextButton>
        ) : (
          <TextButton type="button" tone="ghost" onClick={turnOff}>
            Turn off
          </TextButton>
        )}
        <TextButton type="button" disabled={busy || !pushSupported() || permission !== "granted"} onClick={() => void fireScream()}>
          {busy ? "Screaming…" : "SCREAM NOW (test KUET stack)"}
        </TextButton>
      </div>
      {note ? <p className="mt-3 font-mono text-xs text-pretty">{note}</p> : null}
      <ul className="mt-4 space-y-1 font-mono text-[11px] text-mute">
        <li>· Works best on installed / Add to Home Screen shortcuts.</li>
        <li>· Checks on open, on focus, and every few minutes while the app is awake.</li>
        <li>· Background peeks use the service worker when the OS allows it.</li>
        <li>· On registration / exam / close days the desk fires 4–5 frantic pings (yes, on purpose).</li>
        <li>· If the tray is empty: press SCREAM NOW. If still empty, Windows Focus assist / site notification block is the culprit.</li>
      </ul>
    </section>
  );
}

function SeedCount() {
  const personal = usePersonal();
  const count = buildCatalog(personal).universities.length;
  return (
    <p className="mt-8 font-mono text-xs text-mute">
      {String(count).padStart(2, "0")} RECORDS VISIBLE AFTER YOUR AMENDMENTS AND HIDES.
    </p>
  );
}


function DeskExperiment() {
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(resolveNaughty());
  }, []);

  const toggle = (next: boolean) => {
    applyNaughty(next);
    setOn(next);
  };

  return (
    <section
      className="desk-experiment mt-16 border border-ink p-3"
      data-open={open ? "true" : "false"}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between font-mono text-[10px] tracking-widest text-mute uppercase"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>desk experiment · local only</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div className="mt-3 border-t border-ink pt-3">
          <p className="mb-3 text-xs text-mute">
            Browser-only skin. Not synced. Not in the public product. Flip it if you know what you are doing.
          </p>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              className="size-4 accent-[var(--color-accent)]"
              checked={on}
              onChange={(e) => toggle(e.target.checked)}
            />
            <span className="font-display text-lg font-bold uppercase tracking-wide">
              {on ? "♥ soaked · on" : "horny mode · off"}
            </span>
          </label>
          {on ? (
            <p className="mt-2 font-mono text-[10px] tracking-widest text-accent">
              palette hot · badge throbbing · this machine only
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

