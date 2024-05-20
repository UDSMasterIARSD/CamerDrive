import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAuth } from "../context/AuthContext.tsx";
import AboutUs from "./AboutUs.tsx";
import Profile from "./Profile/Profile.jsx";
import Statistiques from "./Statistiques/Statistiques.jsx";
import AdminDashbord from "./admin/dashbord/AdminDashbord.jsx";
import QuestionDetails from "./admin/manageTasks/QuestionDetails.tsx";
import SignIn from "./auth/SignIn.tsx";
import SignUp from "./auth/SignUp.tsx";
import Courses from "./courses/Courses.tsx";
import CoursesDetails from "./coursesDetails/CoursesDetails.jsx";
import Dashbord from "./dashbord/Dashbord.jsx";
import LastExam from "./lastExam/LastExam.jsx";
import Quiz from "./quiz/Quiz.jsx";
import OnboardingCompo from "./welcome/onboarding/OnboardingCompo.jsx";

const Stack = createNativeStackNavigator();

const Index = () => {
  const { authState, onLogout } = useAuth();

  return (
    <Stack.Navigator initialRouteName="Onboading">
      {authState?.authenticated ? (
        authState.role === "ADMIN" ? (
          <>
            <Stack.Screen
              name="AdminDashboard"
              component={AdminDashbord}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="QuestionDetails"
              component={QuestionDetails}
              options={{ headerShown: false }}
            />
            {/* Ajoutez d'autres écrans d'administration ici */}
          </>
        ) : (
          <>
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
              name="LastExam"
              component={LastExam}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CoursesDetails"
              component={CoursesDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Statistiques"
              component={Statistiques}
              options={{ headerShown: false }}
            />
          </>
        )
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={OnboardingCompo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Index;
