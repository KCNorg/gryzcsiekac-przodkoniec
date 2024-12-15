import OrderCategoryView from "@/components/OrderCategoryView";
import { create_order } from "@/services/order_service";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { StyleSheet, SafeAreaView } from "react-native";

export default function Groceries() {
  const mutation = useMutation({
    mutationFn: () =>
      create_order({
        senior_id: 8,
        category: "groceries",
        description: { data: [] },
      }),
    onSuccess: (result) => {
      if (result.id) router.replace(`/groceries/create/${result.id}`);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <OrderCategoryView
        category="groceries"
        categoryIcon={require("../../assets/images/groceries.png")}
        onCreate={mutation.mutate}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
