// src/App.tsx

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routing } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routing />
    </QueryClientProvider>
  );
}

export default App;