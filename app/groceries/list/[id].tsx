import GroceriesItem from "@/components/groceries/GroceriesItem";
import { Loader } from "@/components/Loader";
import { get_order } from "@/services/order_service";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import StatusLabel from "@/components/StatusLabel";
import { Ionicons } from "@expo/vector-icons";

export default function GroceriesListItem() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data, isLoading } = useQuery({
    queryKey: ["order", parseInt(id)],
    queryFn: async () => await get_order(parseInt(id)),
  });

  if (!data?.description?.data || isLoading) {
    return <Loader />;
  }

  const status = data.status;
  const created = format(parseISO(data.created_at ?? ""), "Pp");
  const products = data.description.data;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Status</Text>
      <View style={styles.status}>
        <Text style={styles.label}>
          Utworzono: <Text style={styles.text}>{created}</Text>
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.label}>Status: </Text>
          <StatusLabel status={status!} />
        </View>
      </View>
      <Text style={styles.title}>Lista zakupów</Text>
      {products.length === 0 && (
        <View style={styles.emptyList}>
          <Ionicons name="cart-outline" size={300} color="#f5f5f5" />
        </View>
      )}
      <ScrollView>
        <View style={styles.productsList}>
          {products.map((product) => (
            <GroceriesItem key={product.id} product={product} />
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
    paddingHorizontal: 16,
    flex: 1,
    gap: 8,
  },
  status: {
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
  text: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  emptyList: {
    alignItems: "center",
    paddingRight: 16,
  },
});
