import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";

export default function GroceriesItem({ task, deleteTask, toggleCompleted }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{task.text}</Text>
      <TouchableOpacity onPress={() => deleteTask(task.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
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
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
  },
  deleteButton: {
    fontSize: 18,
    color: "red",
  },
});
