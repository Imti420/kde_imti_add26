//#region node_modules/.nitro/vite/services/ssr/assets/gate-B1XciLmY.js
function isWireLive(value) {
	if (!value || typeof value !== "object") return false;
	const record = value;
	return record.version === 1 && typeof record.status === "string" && Array.isArray(record.items) && Array.isArray(record.sources);
}
function wireDeskStatus(live, now) {
	if (!live || live.status === "never" || live.generatedAt == null) return "never";
	if (live.status === "running") {
		const started = Date.parse(live.startedAt ?? "");
		if (!Number.isFinite(started) || now.getTime() - started > 18e5) return "failed";
		return "running";
	}
	if (live.status === "failed") return "failed";
	const done = Date.parse(live.completedAt ?? live.generatedAt ?? "");
	if (!Number.isFinite(done) || now.getTime() - done > 72e5) return "stale";
	const next = live.nextExpectedAt ? Date.parse(live.nextExpectedAt) : done + live.intervalMinutes * 6e4;
	if (Number.isFinite(next) && now.getTime() > next) return "late";
	if (live.counts.failed > 0) return "degraded";
	return "current";
}
function nextWireAt(live) {
	if (!live) return null;
	if (live.nextExpectedAt) {
		const parsed = Date.parse(live.nextExpectedAt);
		if (Number.isFinite(parsed)) return new Date(parsed);
	}
	const done = Date.parse(live.completedAt ?? "");
	if (!Number.isFinite(done)) return null;
	return new Date(done + (live.intervalMinutes || 55) * 6e4);
}
//#endregion
export { nextWireAt as n, wireDeskStatus as r, isWireLive as t };
