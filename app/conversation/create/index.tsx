import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { create_order } from "@/services/order_service";
import { Order } from "@/types/order";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";

export default function ConversationCreate() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (order: Order) => create_order(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", "conversation"] });
    },
  });

  const [text, setText] = useState("");
  const [selectedType, setSelectedType] = useState();
  const [date, setDate] = useState(new Date());

  const { recognizing, handleStart, handleStop } = useSpeechRecognition({
    setText,
  });

  async function save() {
    mutation.mutate({
      category: "conversation",
      senior_id: 8,
      valid_since: date.toISOString(),
      description: {
        data: [
          { id: 1, text: selectedType ?? "" },
          { id: 2, text: text },
        ],
      },
    });
    router.replace("/conversation");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>W jakiej formie?</Text>
      <Picker
        style={{ marginTop: -40, marginBottom: -40 }}
        selectedValue={selectedType}
        onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
      >
        <Picker.Item label="Telefonicznie" value="Telefonicznie" />
        <Picker.Item label="Na żywo" value="Na żywo" />
      </Picker>
      <Text style={styles.title}>Kiedy?</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="datetime"
        onChange={(event, date) => setDate(date)}
      />
      <Text style={{ ...styles.title, marginTop: 16 }}>
        Dodatkowe informacje
      </Text>
      <View style={styles.addProduct}>
        <View style={styles.row}>
          <TextInput
            multiline
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="Dodatkowy opis"
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
          <Button title="Utwórz zgłoszenie" onPress={save} />
        </View>
      </View>
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
  addProduct: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    fontSize: 16,
    borderRadius: 16,
    height: 110,
  },
  mic: {
    padding: 8,
    borderRadius: 100,
  },
  row: {
    flexDirection: "row",
  },
  button: {
    marginTop: 24,
  },
  emptyList: {
    alignItems: "center",
    paddingRight: 16,
  },
});
