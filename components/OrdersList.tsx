import { get_orders } from "@/services/order_service";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Button,
  Text,
} from "react-native";
import { Loader } from "./Loader";
import StatusLabel, { STATUS_MAP } from "./StatusLabel";
import { format, parseISO } from "date-fns";

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
        <View style={styles.list}>
          {data.map((order) => (
            <View
              key={order.id}
              style={{
                ...styles.status,
                // @ts-ignore
                borderColor: STATUS_MAP[order.status].color,
              }}
            >
              <View style={styles.label}>
                <StatusLabel status={order.status!} fontSize={20} />
              </View>
              <Text style={styles.label}>
                Utworzono:{" "}
                <Text style={styles.text}>
                  {format(parseISO(order.created_at ?? ""), "Pp")}
                </Text>
              </Text>
              {category === "groceries" && (
                <Link href={`/groceries/list/${order.id}`} asChild>
                  <Button title="Zobacz listę zakupów →" />
                </Link>
              )}
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
  list: {
    paddingVertical: 16,
    gap: 8,
  },
  status: {
    justifyContent: "space-between",
    gap: 8,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    borderLeftWidth: 3,
  },
  label: {
    display: "flex",
    fontSize: 18,
    fontWeight: "500",
  },
  text: {
    fontSize: 18,
    fontWeight: "normal",
  },
});
