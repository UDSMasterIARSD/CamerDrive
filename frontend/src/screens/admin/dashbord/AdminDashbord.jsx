import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AdminDashbordStyle from "./AdminDahbordStyle";
import tasks from "./Tasks";

const AdminDashbord = () => {
  return (
    <>
      <ScrollView>
        <View style={AdminDashbordStyle.container}>
          {/* Texte "My tasks" */}
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
                      <TouchableOpacity
                        key={index}
                        style={AdminDashbordStyle.tasksIconContainer}
                      >
                        <View style={AdminDashbordStyle.tasksIcon}>
                          <Ionicons name={item.icon} size={24} color="white" />
                          <Text style={AdminDashbordStyle.tasksText}>
                            {item.text}
                          </Text>
                        </View>
                      </TouchableOpacity>
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
