import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Start" }} />
      <Stack.Screen name="groceries" options={{ title: "Zakupy" }} />
    </Stack>
  );
}
