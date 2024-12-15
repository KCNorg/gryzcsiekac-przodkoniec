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
        <Stack.Screen name="elderMan" options={{ title: "" }} />
        <Stack.Screen name="groceries" options={{ title: "Zakupy" }} />
        <Stack.Screen name="groceries/index" options={{ title: "Zakupy" }} />
        <Stack.Screen
          name="groceries/shopping-list/[id]"
          options={{ title: "Zakupy" }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
