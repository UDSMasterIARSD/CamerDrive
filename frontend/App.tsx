import React from "react";
import { LogBox, StyleSheet } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

import Index from "./src/screens/Index";

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <AuthProvider>
        <Index />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
