/// <reference types="react/canary" />
import React from "react";
import { VStack } from "@/components/ui/vstack";
import { TodoInput } from "@/components/custom";
import serverTodos from "./actions/server";
import { Center } from "@/components/ui/center";
import { ActivityIndicator } from "react-native";
import { Box } from "@/components/ui/box";
import axios from "axios";

export default function Home() {
  return (
    <React.Suspense
      fallback={
        <Center className="w-full h-full text-center text-xl ">
          <ActivityIndicator />
        </Center>
      }
    >
      <VStack className="flex-1  md:items-center md:justify-center">
        <Box className="w-[600px]">
          {/* client */}
          <TodoInput />
          {/* server */}
          {serverTodos()}
        </Box>
      </VStack>
    </React.Suspense>
  );
}
