import React from "react";
import { StyleSheet } from "react-native";
// import DynamicAppStyles from "./src/screens/welcome/onboarding/DynamicAppStyles";
// import Onboarding from "./src/screens/welcome/onboarding/Onboarding";
// import OnboardingConfig from "./src/screens/welcome/onboarding/OnboardingConfig";
import { AuthProvider } from "./src/context/AuthContext";
import Index from "./src/screens/Index";

export default function App() {
  return (
    /*<View style={styles.container}>
      <Index />
      
    </View>
    */
    <AuthProvider>
      <Index />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
