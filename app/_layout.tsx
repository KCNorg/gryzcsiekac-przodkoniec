import { Stack } from "expo-router";

import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { UserProvider } from "@/services/user_context";

// @ts-ignore
onlineManager.setEventListener((setOnline) => {
  return Network.addNetworkStateListener((state) => {
    // @ts-ignore
    setOnline(state.isConnected);
  });
});

import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            contentStyle: { backgroundColor: "#fff" },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Logowanie" }} />
          <Stack.Screen
            name="elder"
            options={{ title: "", headerShown: false }}
          />
          <Stack.Screen
            name="volunteer"
            options={{ title: "Mapa", headerShown: false }}
          />
          <Stack.Screen name="volunteer/[id]" options={{ title: "" }} />

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
            name="conversation/create/index"
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
          <Stack.Screen
            name="conversation/chat"
            options={{ title: "Chat z GPT" }}
          />
        </Stack>
      </QueryClientProvider>
    </UserProvider>
  );
}
