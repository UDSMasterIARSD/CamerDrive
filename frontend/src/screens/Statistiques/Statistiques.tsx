import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StatistiqueStyle from "./StatistiqueStyle";
import { Test, TestData } from "./TestData";

const Statistiques: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handlePress = () => {
    navigation.goBack(); // Revenir à la page précédente
  };

  const windowWidth = Dimensions.get("window").width;
  const marginLeft = windowWidth * 0.2;
  return (
    <>
      <View>
        <View style={StatistiqueStyle.header}>
          <TouchableOpacity onPress={handlePress}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>

          <Text
            style={{ marginLeft: marginLeft, fontSize: 15, fontWeight: "bold" }}
          >
            Test History
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 20, marginLeft: 20 }}>Overview</Text>
        </View>

        <View style={StatistiqueStyle.container}>
          {TestData.map((test: Test) => (
            <View
              key={test.id}
              style={[
                StatistiqueStyle.testContainer,
                {
                  backgroundColor:
                    test.status === "FAILED" ? "#ffb6c1" : "#e0ffff",
                },
              ]}
            >
              <View style={StatistiqueStyle.testItemContainer}>
                <Text style={StatistiqueStyle.text}>Status of the test:</Text>
                <Text
                  style={[
                    StatistiqueStyle.text,
                    { color: test.status === "FAILED" ? "red" : "green" },
                  ]}
                >
                  {test.status}
                </Text>
              </View>
              <View style={StatistiqueStyle.testItemContainer}>
                <Text style={StatistiqueStyle.text}>Test number</Text>
                <Text style={StatistiqueStyle.text}>{test.id}</Text>
              </View>
              <View style={StatistiqueStyle.testItemContainer}>
                <Text style={StatistiqueStyle.text}>
                  Number of Correct Answers:
                </Text>
                <Text style={StatistiqueStyle.text}>
                  {test.numberOfCorrectAnswers}/{test.numberOfQuestions}
                </Text>
              </View>
              <View style={StatistiqueStyle.testItemContainer}>
                <Text style={StatistiqueStyle.text}>Total learning time:</Text>
                <Text style={StatistiqueStyle.text}>{test.Time} min</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Statistiques;
