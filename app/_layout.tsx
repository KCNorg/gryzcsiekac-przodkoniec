import { Stack } from "expo-router";

import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Network from "expo-network";

// @ts-ignore
onlineManager.setEventListener((setOnline) => {
  return Network.addNetworkStateListener((state) => {
    // @ts-ignore
    setOnline(state.isConnected);
  });
});

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          contentStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Start" }} />
        <Stack.Screen name="elder" options={{ title: "" }} />

        <Stack.Screen name="groceries" options={{ title: "Zakupy" }} />
        <Stack.Screen name="groceries/index" options={{ title: "Zakupy" }} />
        <Stack.Screen
          name="groceries/list/index"
          options={{ title: "Zakupy" }}
        />
        <Stack.Screen
          name="groceries/list/[id]"
          options={{ title: "Zakupy" }}
        />
        <Stack.Screen
          name="groceries/create/[id]"
          options={{ title: "Zakupy" }}
        />

        <Stack.Screen
          name="conversation/index"
          options={{ title: "Rozmowa" }}
        />
        <Stack.Screen
          name="conversation/list/index"
          options={{ title: "Rozmowa" }}
        />
        <Stack.Screen
          name="conversation/create/[id]"
          options={{ title: "Rozmowa" }}
        />

        <Stack.Screen
          name="pet_walking/index"
          options={{ title: "Zwierzęta" }}
        />
        <Stack.Screen
          name="pet_walking/list/index"
          options={{ title: "Zwierzęta" }}
        />
        <Stack.Screen
          name="pet_walking/create/[id]"
          options={{ title: "Zwierzęta" }}
        />

        <Stack.Screen name="other/index" options={{ title: "Coś innego" }} />
        <Stack.Screen
          name="other/list/index"
          options={{ title: "Coś innego" }}
        />
        <Stack.Screen
          name="other/create/[id]"
          options={{ title: "Coś innego" }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
