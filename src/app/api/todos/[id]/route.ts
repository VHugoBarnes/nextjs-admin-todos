import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const todo = await prisma.todo.findFirst({ where: { id: params.id } });

  if (!todo) {
    return NextResponse.json({ message: "[todo-not-found]" }, { status: 404 });
  }

  return NextResponse.json({
    todo: todo
  });
}