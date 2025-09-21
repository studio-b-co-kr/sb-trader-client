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
import { useEffect } from "react";
import axios from 'axios'
import Home from "./pages/Home";
import CampaignsList from "./pages/CampaignsList";
import CampaignPage from "./pages/CampaignPage";
import FoundationNewCampaign from "./pages/FoundationNewCampaign";
import TradesPage from "./pages/TradesPage";
import logo from '@/assets/logo_studiob_crypto.svg'
import { ConnectButton, useCurrentAccount, useWallets } from "@mysten/dapp-kit";

// Root layout route
const RootRoute = createRootRoute({
  component: function RootLayout() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const account = useCurrentAccount();
    const wallets = useWallets()

    async function connectUser(address: string, walletName?: string) {
      try {
        const response = await axios.post('http://127.0.0.1:3000/api/v1/users/connect', {
          wallet_address: address,
          wallet_type: walletName || 'undefined',
        });
        const { access_token } = response.data;

        if (access_token) {
          localStorage.setItem('access_token', access_token);
          console.log('🔐 Access token saved to localStorage');
        } else {
          console.warn('⚠️ No access token returned in response');
        }
        console.log('📡 Connected user successfully:', response.data);
      } catch (error) {
        console.error('❌ Failed to connect user:', error);
      }
    }

    async function disconnectUser() {
      try {
        const token = localStorage.getItem('access_token');

        if (!token) {
          return;
        }

        localStorage.clear();
        await axios.delete('http://127.0.0.1:3000/api/v1/users/disconnect', {
          headers: {
            Authorization: `${token}`,
          },
        });

        console.log('🔐 User disconnected, token removed');
      } catch (error) {
        console.error('❌ Failed to disconnect user:', error);
      }
    }

    useEffect(() => {
      if (account) {
         const wallet = wallets.find((w) =>
          w.accounts.some((a) => a.address === account.address)
        )
        connectUser(account.address, wallet?.name);
      } else {
        disconnectUser()
      }
    }, [account, wallets]);
    
    return (
      <div className="h-screen overflow-auto">
        {!isHomePage && (
          <nav className="border-b border-[#DDDDDD22] text-[#DDDDDD] py-4 px-4 flex flex-row justify-between items-center">
            <div className="flex flex-row gap-8 items-center text-sm pl-4">
              <Link to="/">
                <img
                  src={logo}
                  alt="StudioB Crypto"
                  className="h-8 invert"
                />
              </Link>
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
