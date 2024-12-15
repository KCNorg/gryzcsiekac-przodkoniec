import OrdersList from "@/components/OrdersList";
import { create_order } from "@/services/order_service";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { StyleSheet, SafeAreaView, Button } from "react-native";

export default function Groceries() {
  const mutation = useMutation({
    mutationFn: () =>
      create_order({
        senior_id: 8,
        category: "groceries",
        valid_since: "1",
        valid_until: "1",
        description: { data: [] },
      }),
    onSuccess: (result) => {
      if (result.id)
        router.replace(`/groceries/shopping-list/create/${result.id}`);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <OrdersList category="groceries" />
      <Button title="Dodaj zakupy" onPress={() => mutation.mutate()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
});
