// src/router.tsx

import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Link,
  Outlet,
  useLocation
} from "@tanstack/react-router";
import Home from "./pages/Home";
import CampaignsList from "./pages/CampaignsList";
import CampaignPage from "./pages/CampaignPage";
import FoundationNewCampaign from "./pages/FoundationNewCampaign";
import TradesPage from "./pages/TradesPage";
import { ConnectButton } from "@mysten/dapp-kit";

// Root layout route
const RootRoute = createRootRoute({
  component: function RootLayout() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    
    return (
      <div className="h-screen overflow-hidden">
        {!isHomePage && (
          <nav className="border-b border-[#DDDDDD22] text-[#DDDDDD] py-4 px-4 flex flex-row justify-between items-center">
            <div className="flex flex-row gap-8 items-center text-sm pl-4">
              <Link to="/">Home</Link>
              <Link to="/campaigns">Campaigns List</Link>
              <Link to="/foundation-new-campaign">Foundation New Campaign</Link>
              <Link to="/trades">Trades</Link>
            </div>
            <div> 
              <ConnectButton />
            </div>
          </nav>
        )}
        <main style={{ overflow: "auto" }}>
          <Outlet />
        </main>
      </div>
    );
  },
});

// Home route
const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/",  // exact root
  component: function HomeWrapper() {
    return (
      <>
        <Home />
      </>
    );
  },
});

const FoundationNewCampaignRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/foundation-new-campaign",  // exact root
  component: function FoundationNewCampaignWrapper() {
    return (
      <>
        <FoundationNewCampaign />
      </>
    );
  },
});

const TradesPageRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/trades",  // exact root
  component: function FoundationNewCampaignWrapper() {
    return (
      <>
        <TradesPage />
      </>
    );
  },
});

// Campaigns route layout (renders nested routes)
const CampaignsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "campaigns",  // parent layout for campaigns
  component: function CampaignsLayout() {
    return (
      <Outlet />
    );
  },
});

// Campaigns list index route
const CampaignsIndexRoute = createRoute({
  getParentRoute: () => CampaignsRoute,
  path: "/",  // index route for /campaigns
  component: function CampaignsListWrapper() {
    return <CampaignsList />;
  },
});

// Campaign page route (dynamic child of campaigns)
const CampaignPageRoute = createRoute({
  getParentRoute: () => CampaignsRoute,
  path: "$campaignId",  // correct dynamic syntax from docs
  component: function CampaignPageWrapper() {
    const { campaignId } = CampaignPageRoute.useParams();
    return (
      <CampaignPage campaignId={campaignId!} />
    );
  },
});

// Build the tree
const routeTree = RootRoute.addChildren([
  HomeRoute,
  CampaignsRoute.addChildren([
    CampaignsIndexRoute,
    CampaignPageRoute,
  ]),
  FoundationNewCampaignRoute,
  TradesPageRoute,
]);

// Create router
const router = createRouter({ routeTree });

// Register types (if using TypeScript)
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Export the RouterProvider wrapper
export function Routing() {
  return <RouterProvider router={router} />;
}
