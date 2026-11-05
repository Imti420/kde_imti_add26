import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as isWireLive } from "./gate-B1XciLmY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/published-C_icqy9m.js
var PUBLISHED_WIRE = "https://raw.githubusercontent.com/Imti420/IMTI_ADD26/main/public/wire/live.json";
var fetchPublishedWire_createServerFn_handler = createServerRpc({
	id: "c2b7300fbadeeb6dd993af171e1a24a60f9d11bac88e02bf5c40648cb3d45619",
	name: "fetchPublishedWire",
	filename: "src/lib/wire/published.ts"
}, (opts) => fetchPublishedWire.__executeServer(opts));
var fetchPublishedWire = createServerFn({ method: "POST" }).handler(fetchPublishedWire_createServerFn_handler, async () => {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 8e3);
	try {
		const response = await fetch(PUBLISHED_WIRE, {
			signal: controller.signal,
			headers: {
				accept: "application/json",
				"user-agent": "ADMISSION26-newswire/1.0"
			}
		});
		if (!response.ok) return null;
		const json = await response.json();
		return isWireLive(json) ? json : null;
	} catch {
		return null;
	} finally {
		clearTimeout(timer);
	}
});
//#endregion
export { fetchPublishedWire_createServerFn_handler };
