import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Row, Table } from "react-native-table-component";
import QuestionList from "./QuestionList";

const QuestionDetails = () => {
  const [tableHead] = useState(["ID", "Question Text", "Actions"]);
  const [widthArr] = useState([40, 240, 100]);

  const renderRows = () => {
    return QuestionList.map((rowData, index) => (
      <Row
        key={index}
        data={[
          rowData.id,
          rowData.questionText,
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={() => handleEditQuestion(rowData.id)}>
              <Ionicons name="create-outline" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteQuestion(rowData.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>,
        ]}
        widthArr={widthArr}
        style={[styles.row, index % 2 && { backgroundColor: "#F7F6E7" }]}
        textStyle={styles.text}
      />
    ));
  };

  const handleEditQuestion = (questionId) => {
    // Logique pour éditer la question
  };

  const handleDeleteQuestion = (questionId) => {
    // Logique pour supprimer la question
  };

  const handleAddQuestion = () => {
    // Logique pour ajouter une nouvelle question
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 20,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Text style={{ fontSize: 34, fontWeight: "bold" }}>Questions</Text>
        <TouchableOpacity onPress={() => handleAddQuestion()}>
          <Ionicons name="add-circle-outline" size={34} color="green" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#000" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#000" }}>
              {renderRows()}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default QuestionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight + 20,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    height: 50,
    backgroundColor: "#537791",
  },
  text: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 15,
  },
  dataWrapper: { marginTop: -1 },
  row: {
    height: 70, // Hauteur des cases
    backgroundColor: "#E7E6E1",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
