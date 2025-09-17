import { Route as RootRoute } from "./routes/__root";
import { Route as IndexRoute } from "./routes/index";
import { Route as CampaignsRoute } from "./routes/campaigns/index";
import { Route as CampaignIdRoute } from "./routes/campaigns/$campaignId";

export const routeTree = RootRoute.addChildren([
  IndexRoute,
  CampaignsRoute.addChildren([
    CampaignIdRoute,
  ]),
]);
