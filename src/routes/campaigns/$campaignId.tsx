// src/routes/campaigns/$campaignId.tsx

import { createFileRoute } from "@tanstack/react-router";
import CampaignPage from "../../pages/CampaignPage";
import { Route as CampaignsListRoute } from "./index";

export const Route = createFileRoute("/campaigns/$campaignId")({
  getParentRoute: () => CampaignsListRoute,
  component: function CampaignDetailsWrapper() {
    const { campaignId } = Route.useParams();
    if (!campaignId) {
      // You can render a blank/fallback page if needed
      return <div>Campaign unknown</div>;
    }
    return <CampaignPage campaignId={campaignId} />;
  },
});