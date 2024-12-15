import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

const statusMap = {
  pending: {
    text: "Oczekujące na wolontariusza",
    icon: "timer-outline",
    color: "#2563eb",
  },
  accepted: {
    text: "Wolontariusz zaakceptował",
    icon: "happy-outline",
    color: "#16a34a",
  },
  completed: {
    text: "Zrealizowano",
    icon: "checkmark-done-outline",
    color: "#9333ea",
  },
  cancelled: {
    text: "Anulowano",
    icon: "timer-outline",
    color: "#dc2626",
  },
};

export default function StatusLabel({ status }: { status: string }) {
  // @ts-ignore
  const { text, icon, color } = statusMap[status];

  return (
    <View style={styles.row}>
      <Text style={{ ...styles.text, color: color }}>{text}</Text>
      <Ionicons name={icon} size={24} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
