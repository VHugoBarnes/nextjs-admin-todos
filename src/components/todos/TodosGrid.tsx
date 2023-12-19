"use client";

import { Todo } from "@prisma/client";
import React from "react";
import { TodoItem } from ".";
import * as api from "@/helpers/todos";

interface Props {
  todos?: Todo[]
};

export const TodosGrid = ({ todos }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {
        todos?.map(todo => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={api.updateTodo} />
        ))
      }
    </div>
  );
};