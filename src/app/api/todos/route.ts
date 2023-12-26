import { getUserServerSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      {
        message: "[invalid-take]"
      },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      {
        message: "[invalid-skip]"
      },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({ take: take, skip: skip });

  return NextResponse.json({
    todos: todos
  });
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});
export async function POST(request: Request) {
  const user = await getUserServerSession();
  if (!user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  try {
    const { complete, description } = await postSchema.validate(await request.json());
    const todo = await prisma.todo.create({ data: { complete: complete, description: description, userId: user?.id } });

    return NextResponse.json({ todo });
  } catch (error) {
    return NextResponse.json({ message: "[server-error]" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await getUserServerSession();
  if (!user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  try {
    await prisma.todo.deleteMany({ where: { complete: true, userId: user.id } });

    return NextResponse.json({ message: "[success]" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "[server-error]" }, { status: 500 });
  }
}