import GroceriesItem from "@/components/groceries/GroceriesItem";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export type Product = {
  id: number;
  text: string;
};

export default function Groceries() {
  const [products, setProducts] = useState<Product[]>([]);
  const [text, setText] = useState("");

  const { recognizing, handleStart, handleStop } = useSpeechRecognition({
    setText,
  });

  async function addProduct() {
    const newProduct = { id: Date.now(), text, completed: false };
    setProducts([...products, newProduct]);
    setText("");
  }

  function deleteTask(id: number) {
    setProducts(products.filter((product) => product.id !== id));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dodaj do listy zakupów</Text>
      <View style={styles.addProduct}>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="Wpisz co dodać do listy..."
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.mic}
              onPress={recognizing ? handleStop : handleStart}
            >
              {recognizing ? (
                <Ionicons name="mic-off-outline" size={32} />
              ) : (
                <Ionicons name="mic-outline" size={32} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            title="Dodaj do listy"
            onPress={addProduct}
            disabled={text === "" || recognizing}
          />
        </View>
      </View>
      <Text style={styles.title}>Lista zakupów</Text>
      <ScrollView>
        <View style={styles.productsList}>
          {products.map((product) => (
            <GroceriesItem
              key={product.id}
              product={product}
              deleteTask={deleteTask}
            />
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
  addProduct: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    fontSize: 16,
    borderRadius: 16,
  },
  mic: {
    padding: 8,
    borderRadius: 100,
  },
  row: {
    flexDirection: "row",
  },
  button: {
    marginTop: 8,
  },
});
