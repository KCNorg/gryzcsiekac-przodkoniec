import GroceriesItem from "@/components/groceries/GroceriesItem";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Groceries() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Doctor Appointment", completed: true },
    { id: 2, text: "Meeting at School", completed: false },
  ]);
  const [text, setText] = useState("");

  function addTask() {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText("");
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleCompleted(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.productsList}>
          {tasks.map((task) => (
            <GroceriesItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.addProduct}>
        <Text style={styles.title}>Dodaj do listy zakupów</Text>
        <TextInput value={text} onChangeText={setText} placeholder="New Task" />
        <Button title="Add" onPress={addTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  productsList: {
    padding: 16,
    flex: 1,
    rowGap: 4,
  },
  addProduct: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
