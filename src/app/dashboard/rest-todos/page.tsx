import { TodosGrid } from "@/components/todos";
import { NewTodo } from "@/components/todos/NewTodo";
import prisma from "@/lib/prisma";
import React from "react";

export const metadata = {
  title: "Rest TODOs"
};

const page = async () => {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <div className="w-full px-10 pb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
};

export default page;