import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import AdminDashbordStyle from "./AdminDahbordStyle";
import tasks from "./Tasks";

const AdminDashbord = () => {
  const navigation = useNavigation();
  const { onLogout } = useAuth();

  const handleTaskPress = (task) => {
    switch (task.text) {
      case "Question Management":
        navigation.navigate("QuestionDetails", { type: "questions" });
        break;
      case "User Management":
        navigation.navigate("QuestionDetails", { type: "users" });
        break;
      case "Courses Management":
        navigation.navigate("QuestionDetails", { type: "courses" });
        break;
      case "Concepts Management":
        navigation.navigate("QuestionDetails", { type: "concepts" });
        break;
      case "Quiz Management":
        navigation.navigate("QuestionDetails", { type: "quizzes" });
        break;
      default:
        break;
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "YES", onPress: () => onLogout() },
      ],
      {
        alertContainerStyle: AdminDashbordStyle.alertContainer,
      }
    );

  return (
    <>
      <ScrollView>
        <View style={AdminDashbordStyle.container}>
          <Pressable style={{ marginLeft: 10 }} onPress={createTwoButtonAlert}>
            <Ionicons name="log-out" size={30} color="#003f5c" />
          </Pressable>
          <Text style={AdminDashbordStyle.textBelowLine}>
            You can perform the following tasks
          </Text>
          <View style={AdminDashbordStyle.tasksContainer}>
            {Array.from({ length: Math.ceil(tasks.length / 2) }).map(
              (_, rowIndex) => (
                <View style={AdminDashbordStyle.tasksRow} key={rowIndex}>
                  {tasks
                    .slice(rowIndex * 2, (rowIndex + 1) * 2)
                    .map((item, index) => (
                      <Pressable
                        key={index}
                        style={AdminDashbordStyle.tasksIconContainer}
                        onPress={() => handleTaskPress(item)}
                      >
                        <View style={AdminDashbordStyle.tasksIcon}>
                          <Ionicons name={item.icon} size={24} color="white" />
                          <Text style={AdminDashbordStyle.tasksText}>
                            {item.text}
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                </View>
              )
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AdminDashbord;
