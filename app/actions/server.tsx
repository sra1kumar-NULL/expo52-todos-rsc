"use server";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { DeleteItem, TodoItem } from "@/components/custom";

// this page completely runs on the server ! - this is a server action - a component renderered on the server with dynamic data.

export default async function serverTodos() {
  const response = await fetch("http://localhost:3000/todos/");
  const todos = await response.json();

  return (
    <VStack className="flex-1 gap-8 overflow-auto max-h-[80vh] pt-4 items-start">
      <>
        {todos?.map((todo: any, index: number) => (
          <HStack
            key={index}
            className="rounded-md hover:bg-secondary-200 justify-between items-center w-full"
          >
            {/* this is a hybrid component which is a client basically but calls a server function from it. */}
            <TodoItem todo={todo} />
            {/* this is a hybrid component which is a client basically but calls a server function from it. */}
            <DeleteItem todo={todo} />
          </HStack>
        ))}
      </>
    </VStack>
  );
}
