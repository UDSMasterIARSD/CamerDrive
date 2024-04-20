import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Courses from "./courses/Courses.jsx";
import Dashbord from "./dashbord/Dashbord.jsx";
import LastExam from "./lastExam/LastExam.jsx";
import Quiz from "./quiz/Quiz.jsx";
import OnboardingCompo from "./welcome/onboarding/OnboardingCompo.jsx";

const Stack = createNativeStackNavigator();

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboading">
        <Stack.Screen
          name="Onboarding"
          component={OnboardingCompo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Dashbord}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Courses"
          component={Courses}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Last exam"
          component={LastExam}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
