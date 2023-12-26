import { getUserServerSession } from "@/auth/actions/auth-actions";
import { TodosGrid } from "@/components/todos";
import { NewTodo } from "@/components/todos/NewTodo";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Rest TODOs"
};

const page = async () => {
  const user = await getUserServerSession();

  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: user?.id },
    orderBy: { description: "asc" }
  });

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