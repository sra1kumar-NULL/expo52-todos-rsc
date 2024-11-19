"use client";
import React from "react";
import { Pressable } from "@/components/ui/pressable";
import { CheckIcon, CloseIcon, Icon } from "@/components/ui/icon";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import shortid from "shortid";
import axios from "axios";

// this page entirely is a client page 
// but has few server calls in the some of the client components

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

// client component with fetching from server
export const TodoInput = () => {
  const [item, setItem] = React.useState("");

  async function handleAddTodo(task: string) {
    "use server";
    if (task) {
      const response = await axios.post("http://localhost:3000/todos/", {
        id: shortid.generate(),
        task: task,
        completed: false,
      });
      console.log(response?.statusText, "this is response");
    }
    setItem("");
  }

  return (
    <FormControl className="my-4">
      <Input variant="underlined" size="sm" className="mx-6 my-2 ">
        <InputField
          placeholder="I need to do?"
          autoFocus
          value={item}
          onChangeText={(value) => setItem(value)}
          onSubmitEditing={() => handleAddTodo(item)}
        />
      </Input>
    </FormControl>
  );
};
//client component with server call function - delete function.
export const DeleteItem = ({ todo }: { todo: Todo }) => {
  return (
    <Pressable
      className="pr-6 py-2"
      onPress={async () => {
        "use server";
        if (todo.id) {
          const response = await axios.delete(
            `http://localhost:3000/todos/${todo.id}`
          );
          console.log(response.statusText, "this is response from delete");
        }
      }}
    >
      {({ hovered }: { hovered: boolean }) => {
        return (
          <Icon
            as={CloseIcon}
            size="xs"
            className={hovered ? "stroke-red-400" : "stroke-primary-50"}
          />
        );
      }}
    </Pressable>
  );
};
//client component with server call function - put function.
export const TodoItem = ({ todo }: { todo: Todo }) => {
  return (
    <Checkbox
      onChange={async (_isChecked) => {
        "use server";
        if (todo.id) {
          const response = await axios.put(
            `http://localhost:3000/todos/${todo.id}`,
            {
              ...todo,
              completed: _isChecked,
            }
          );
          console.log(response.statusText, "this is response from Toggle");
        }
      }}
      size="sm"
      aria-label={todo.task}
      value={todo.task}
      isChecked={todo.completed}
      className="pl-6 py-2 flex-1"
    >
      <CheckboxIndicator>
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel className="text-sm data-[checked=true]:line-through">
        {todo.task}
      </CheckboxLabel>
    </Checkbox>
  );
};
