import React from "react";
import { StyleSheet, View } from "react-native";
// import DynamicAppStyles from "./src/screens/welcome/onboarding/DynamicAppStyles";
// import Onboarding from "./src/screens/welcome/onboarding/Onboarding";
// import OnboardingConfig from "./src/screens/welcome/onboarding/OnboardingConfig";
import Index from "./src/screens/Index";

export default function App() {
  return (
    <View style={styles.container}>
      <Index />
      {/* <Onboarding appConfig={OnboardingConfig} appStyles={DynamicAppStyles} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
