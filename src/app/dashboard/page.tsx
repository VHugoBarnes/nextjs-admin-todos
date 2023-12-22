import { WidgetItem } from "@/components";
import React from "react";

export const metadata = {
  title: "Dashboard"
};

const page = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="x">hola</WidgetItem>
    </div>
  );
};

export default page;