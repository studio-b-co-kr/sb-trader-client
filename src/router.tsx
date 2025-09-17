// src/router.tsx

import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Link,
  Outlet
} from "@tanstack/react-router";
import Home from "./pages/Home";
import CampaignsList from "./pages/CampaignsList";
import CampaignPage from "./pages/CampaignPage";

// Root layout route
const RootRoute = createRootRoute({
  component: function RootLayout() {
    return (
      <div className="h-screen overflow-hidden">
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <Link to="/">Home</Link>{" | "}
          <Link to="/campaigns">Campaigns List</Link>{" | "}
          <Link to="/campaigns/blue">CampaignPage “blue”</Link>
        </nav>
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
        <h1>Home Route</h1>
        <Home />
      </>
    );
  },
});

// const FoundationNewCampaignRoute = createRoute({
//   getParentRoute: () => RootRoute,
//   path: "/",  // exact root
//   component: function FoundationNewCampaignWrapper() {
//     return (
//       <>
//         <h1>Home Route</h1>
//         <Home />
//       </>
//     );
//   },
// });

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
