import { get_orders } from "@/services/order_service";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import { Loader } from "./Loader";

export default function OrdersList({ category }: { category: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["orders", category],
    queryFn: async () => await get_orders({ category }),
  });

  if (!data || isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.productsList}>
          {data.map((order) => (
            <View key={order.id}>
              <Link href={`/groceries/shopping-list/${order.id}`} asChild>
                <Button title={`Order ${order.id}`} />
              </Link>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  title: {
    padding: 16,
    paddingBottom: 12,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
  productsList: {
    paddingHorizontal: 12,
    flex: 1,
    gap: 8,
  },
});
