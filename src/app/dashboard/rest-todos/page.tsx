import { TodosGrid } from "@/components/todos";
import prisma from "@/lib/prisma";
import React from "react";

export const metadata = {
  title: "Rest TODOs"
};

const page = async () => {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <TodosGrid todos={todos} />
    </div>
  );
};

export default page;