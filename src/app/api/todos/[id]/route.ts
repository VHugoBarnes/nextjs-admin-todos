import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const todo = await prisma.todo.findFirst({ where: { id: params.id } });

  if (!todo) {
    return NextResponse.json({ message: "[todo-not-found]" }, { status: 404 });
  }

  return NextResponse.json({
    todo: todo
  });
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});
const putIdSchema = yup.string().uuid();
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = await putIdSchema.validate(params.id);
    const { complete, description } = await putSchema.validate(await request.json());
    const payload: { complete?: boolean, description?: string } = {};

    if (complete !== undefined) {
      payload.complete = complete;
    }
    if (description) {
      payload.description = description;
    }

    const todo = await prisma.todo.update({ where: { id: id }, data: payload });

    return NextResponse.json({ todo });
  } catch (error) {
    return NextResponse.json({ message: "[forbidden]" }, { status: 400 });
  }
}