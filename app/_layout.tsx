import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Start" }} />
      <Stack.Screen name="groceries" options={{ title: "Zakupy" }} />
    </Stack>
  );
}
