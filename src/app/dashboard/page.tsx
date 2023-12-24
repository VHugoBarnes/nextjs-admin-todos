import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Dashboard"
};

const DashboardPage = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Connected user server side">
        {JSON.stringify(session.user, null, 2)}
      </WidgetItem>
    </div>
  );
};

export default DashboardPage;