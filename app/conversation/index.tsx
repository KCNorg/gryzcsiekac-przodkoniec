import OrderCategoryView from "@/components/OrderCategoryView";
import { StyleSheet, SafeAreaView } from "react-native";

export default function Conversation() {
  return (
    <SafeAreaView style={styles.container}>
      <OrderCategoryView
        category="conversation"
        categoryIcon={require("../../assets/images/talk.png")}
        onCreate={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
