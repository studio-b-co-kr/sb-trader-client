// src/routes/index.tsx

import { createFileRoute } from "@tanstack/react-router";
import Home from "../pages/Home";
import { Route as RootRoute } from "./__root";

export const Route = createFileRoute("/")({
  getParentRoute: () => RootRoute,
  component: Home,
});