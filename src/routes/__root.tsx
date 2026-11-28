import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Shell } from "@/components/shell";
import { THEME_BOOT, ThemeBoot } from "@/components/theme";
import { LANG_BOOT, LangProvider } from "@/lib/i18n";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ADMISSION//26 — Never miss a Bangladesh university admission deadline" },
      {
        name: "description",
        content:
          "Bangladesh university admission circulars, application windows, exam dates and calendar for the 2026–27 session. One desk for DU, BUET, RU, JU, KUET and more.",
      },
      { name: "theme-color", content: "#141414" },
      { name: "robots", content: "index,follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ADMISSION//26" },
      { property: "og:title", content: "ADMISSION//26 — Never miss a Bangladesh university admission deadline" },
      {
        property: "og:description",
        content:
          "Circulars, calendars and open application windows for Bangladesh public universities — 2026–27 session.",
      },
      { property: "og:url", content: "https://kdeimtiadd26.vercel.app/" },
      { property: "og:image", content: "https://kdeimtiadd26.vercel.app/og.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ADMISSION//26 — Never miss a Bangladesh university admission deadline" },
      {
        name: "twitter:description",
        content: "Circulars, calendars and open application windows for Bangladesh public universities — 2026–27.",
      },
      { name: "twitter:image", content: "https://kdeimtiadd26.vercel.app/og.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://kdeimtiadd26.vercel.app/" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icons/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icons/icon-512.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/icon-180.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+Bengali:wght@400;500;600;700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT + LANG_BOOT }} />
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <ThemeBoot />
        <AuthProvider>
          <LangProvider>
            <Shell>
              <Outlet />
            </Shell>
          </LangProvider>
        </AuthProvider>
        <Scripts />
        <script defer src="/_vercel/insights/script.js"></script>
      </body>
    </html>
  ),
  notFoundComponent: () => (
    <div className="window">
      <div className="window-bar">404 · not in the archive</div>
      <div className="window-body">
        <h1 className="font-display text-5xl font-bold uppercase">Not in the archive</h1>
        <a href="/" className="press mt-4">
          Return to overview
        </a>
      </div>
    </div>
  ),
});
