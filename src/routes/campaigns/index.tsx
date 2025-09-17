// src/routes/campaigns/index.tsx

import { createFileRoute } from "@tanstack/react-router";
import CampaignsList from "../../pages/CampaignsList";
import { Route as RootRoute } from "../__root";

export const Route = createFileRoute("/campaigns")({
  getParentRoute: () => RootRoute,
  component: CampaignsList,
});