import OrderCategoryView from "@/components/OrderCategoryView";
import { router } from "expo-router";
import { StyleSheet, SafeAreaView } from "react-native";

export default function Conversation() {
  return (
    <SafeAreaView style={styles.container}>
      <OrderCategoryView
        category="conversation"
        categoryIcon={require("../../assets/images/talk.png")}
        onCreate={() => router.replace("/conversation/create")}
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
