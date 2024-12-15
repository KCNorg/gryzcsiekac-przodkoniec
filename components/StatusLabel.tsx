import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

export const STATUS_MAP = {
  pending: {
    text: "Oczekujące na wolontariusza",
    icon: "timer-outline",
    color: "#9333ea",
  },
  accepted: {
    text: "Wolontariusz zaakceptował",
    icon: "happy-outline",
    color: "#16a34a",
  },
  completed: {
    text: "Zrealizowano",
    icon: "checkmark-done-outline",
    color: "#2563eb",
  },
  cancelled: {
    text: "Anulowano",
    icon: "timer-outline",
    color: "#dc2626",
  },
};

export default function StatusLabel({
  status,
  fontSize,
}: {
  status: string;
  fontSize?: number;
}) {
  // @ts-ignore
  const { text, icon, color } = STATUS_MAP[status];

  return (
    <View style={styles.row}>
      <Text style={{ ...styles.text, color: color, fontSize: fontSize ?? 18 }}>
        {text}
      </Text>
      <Ionicons name={icon} size={24} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "semibold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
