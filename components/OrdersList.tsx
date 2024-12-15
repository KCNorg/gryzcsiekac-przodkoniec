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
    queryFn: async () =>
      await get_orders({
        category,
        senior_id: 8,
        sort_by: "created_at",
        sort_direction: "desc",
      }),
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
              <View style={styles.dateRow}>
                <Text style={styles.dateText}>
                  {format(parseISO(order.created_at ?? ""), "P")}
                </Text>
                <Text style={styles.dateText}>
                  {format(parseISO(order.created_at ?? ""), "p")}
                </Text>
              </View>
              <View style={styles.row}>
                <StatusLabel status={order.status!} />
              </View>
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
  dateText: {
    fontSize: 14,
    color: "#4b5563",
  },
  text: {
    fontSize: 18,
    fontWeight: "normal",
  },
  row: {
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  dateRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
