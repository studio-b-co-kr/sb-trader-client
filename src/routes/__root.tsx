// src/routes/__root.tsx

import { createRootRoute, Outlet, Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: function RootLayout() {
    return (
      <div>
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <Link to="/">Home</Link>{" | "}
          <Link to="/campaigns">Campaigns List</Link>
        </nav>
        <main style={{ padding: "1rem" }}>
          <Outlet />
        </main>
      </div>
    );
  },
});