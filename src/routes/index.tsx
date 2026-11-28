import { createFileRoute } from "@tanstack/react-router";
import { OverviewHome } from "@/components/overview-home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ADMISSION//26 — Never miss a Bangladesh university admission deadline" },
      {
        name: "description",
        content:
          "Bangladesh university admission circulars, deadlines, and calendar for the 2026–27 session. DU, BUET, RU, JU, KUET and more — one desk.",
      },
    ],
  }),
  component: OverviewHome,
});
