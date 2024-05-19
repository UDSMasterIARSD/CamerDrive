import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Row, Table } from "react-native-table-component";
import CourseList from "./CourseList";
import QuestionDetailsStyle from "./QuestionDetailsStyles";
import QuestionList from "./QuestionList";
import UserList from "./UserList";

const QuestionDetails = () => {
  const route = useRoute();
  const { type } = route.params;

  const [tableHead, setTableHead] = useState([
    "ID",
    "Question Text",
    "Actions",
  ]);
  const [dataList, setDataList] = useState(QuestionList);
  const [widthArr, setWidthArr] = useState([40, 240, 100]);

  useEffect(() => {
    if (type === "users") {
      setTableHead(["ID", "User Name", "Actions"]);
      setDataList(UserList);
    } else if (type === "courses") {
      setTableHead(["ID", "Course Name", "Actions"]);
      setDataList(CourseList);
    } else {
      setTableHead(["ID", "Question Text", "Actions"]);
      setDataList(QuestionList);
    }
  }, [type]);

  const renderRows = () => {
    return dataList.map((rowData, index) => (
      <Row
        key={index}
        data={[
          rowData.id,
          type === "users"
            ? rowData.userName
            : type === "courses"
            ? rowData.courseName
            : rowData.questionText,
          <View style={QuestionDetailsStyle.rowView}>
            <TouchableOpacity onPress={() => handleEdit(rowData.id)}>
              <Ionicons name="create-outline" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(rowData.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>,
        ]}
        widthArr={widthArr}
        style={[
          QuestionDetailsStyle.row,
          index % 2 && { backgroundColor: "#F7F6E7" },
        ]}
        textStyle={QuestionDetailsStyle.text}
      />
    ));
  };

  const handleEdit = (id) => {
    // Logique pour éditer la question ou l'utilisateur
  };

  const handleDelete = (id) => {
    // Logique pour supprimer la question ou l'utilisateur
  };

  const handleAdd = () => {
    // Logique pour ajouter une nouvelle question ou un utilisateur
  };

  return (
    <View style={QuestionDetailsStyle.container}>
      <View style={QuestionDetailsStyle.titleHeader}>
        <Text style={QuestionDetailsStyle.titleText}>
          {type === "users"
            ? "Users"
            : type === "courses"
            ? "Courses"
            : "Questions"}
        </Text>
        <TouchableOpacity onPress={handleAdd}>
          <Ionicons name="add-circle-outline" size={34} color="green" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#000" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={QuestionDetailsStyle.header}
              textStyle={QuestionDetailsStyle.text}
            />
          </Table>
          <ScrollView style={QuestionDetailsStyle.dataWrapper}>
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
