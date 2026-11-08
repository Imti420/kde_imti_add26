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
      { title: "ADMISSION//26" },
      {
        name: "description",
        content: "The Bangladesh university admission archive for the 2026–27 session.",
      },
      { name: "theme-color", content: "#141414" },
    ],
    links: [
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
