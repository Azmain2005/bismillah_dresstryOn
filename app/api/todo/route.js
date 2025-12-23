import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";

// 🟢 Get all todos
export async function GET() {
  await ConnectDB();
  const todos = await TodoModel.find();
  return NextResponse.json(todos);
}

// 🟡 Add a new todo
export async function POST(request) {
  await ConnectDB();
  const formData = await request.formData();

  const newTodo = await TodoModel.create({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
  });

  return NextResponse.json(newTodo);
}

// 🔴 Delete todo by ID (?id=...)
export async function DELETE(request) {
  await ConnectDB();
  const id = new URL(request.url).searchParams.get("id");

  await TodoModel.findByIdAndDelete(id);
  return NextResponse.json({ message: "Todo deleted" });
}

// 🟠 Update todo by ID (?id=...)
export async function PUT(request) {
  await ConnectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const formData = await request.formData();
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
  };

  const updated = await TodoModel.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(updated);
}

