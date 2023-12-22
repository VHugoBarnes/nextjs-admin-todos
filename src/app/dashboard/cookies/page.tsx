import { TabBar } from "@/components/TabBar";
import React from "react";

export const metadata = {
  title: "Cookies page",
  description: "Working with cookies"
};

const CookiesPage = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <span className="text-3xl">Tabs</span>
      <TabBar />
    </div>
  );
};

export default CookiesPage;