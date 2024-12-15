import { Product } from "@/types/order";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type GroceriesItemProps = {
  product: Product;
  deleteTask?: (id: number) => void;
};

export default function GroceriesItem({
  product,
  deleteTask,
}: GroceriesItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{product.text}</Text>
      {deleteTask && (
        <TouchableOpacity onPress={() => deleteTask(product.id)}>
          <Text style={styles.deleteButton}>Usuń</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
  },
  itemText: {
    fontSize: 18,
    maxWidth: "80%",
  },
  deleteButton: {
    fontSize: 18,
    color: "red",
  },
});
