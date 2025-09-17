// src/pages/Home.tsx
import { Link } from "@tanstack/react-router";

export default function Home() {
  return (
    <div className="mx-auto w-[96] flex flex-col items-center justify-center h-screen">
      <Link to="/campaigns">Campaigns List</Link>
      <Link to="/campaigns/blue">CampaignPage "blue"</Link>
    </div>
  );
}