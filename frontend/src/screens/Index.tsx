import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useAuth } from "../context/AuthContext";
import AboutUs from "./AboutUs";
import Profile from "./Profile/Profile";
import Statistiques from "./Statistiques/Statistiques";
import AdminDashbord from "./admin/dashbord/AdminDashbord";
import AddForm from "./admin/forms/AddForm";
import DetailsPage from "./admin/forms/DetailsPage";
import EditForm from "./admin/forms/EditForm";
import QuestionDetails from "./admin/manageTasks/QuestionDetails";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Courses from "./courses/Courses";
import CoursesDetails from "./coursesDetails/CoursesDetails";
import Dashbord from "./dashbord/Dashbord";
import LastExam from "./lastExam/LastExam";
import Quiz from "./quiz/Quiz";
import OnboardingCompo from "./welcome/onboarding/OnboardingCompo";

const Stack = createNativeStackNavigator();

const Index = () => {
  const { authState } = useAuth();

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
            <Stack.Screen
              name="AddForm"
              component={AddForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditForm"
              component={EditForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="DetailsPage" component={DetailsPage} />
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
