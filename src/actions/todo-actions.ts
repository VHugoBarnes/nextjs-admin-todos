"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

const sleep = async (seconds: number = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  // await sleep(3);
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw "[todo-not-found]";
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete: complete }
  });

  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description: description } });
    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    return {
      message: "[server-error]"
    };
  }
};

export const deleteCompletedTodos = async (path: string) => {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });
    revalidatePath(path);
  } catch (error) {
    throw Error("[server-error]");
  }
};