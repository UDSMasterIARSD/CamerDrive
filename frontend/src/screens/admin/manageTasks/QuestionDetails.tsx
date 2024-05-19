import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Row, Table } from "react-native-table-component";
import {
  CoursControllerApi,
  QuestionControllerApi,
  UserControllerApi,
} from "../../../../generated/index";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "../../../environments/axiosInstance";
import environment from "../../../environments/environment";
import QuestionDetailsStyle from "./QuestionDetailsStyles";

type QuestionDetailsRouteParams = {
  params: {
    type: "users" | "courses" | "questions";
  };
};

type DataItem = {
  id: number;
  username?: string;
  courseName?: string;
  questionText?: string;
};

const QuestionDetails = () => {
  const route = useRoute<RouteProp<QuestionDetailsRouteParams, "params">>();
  const { type } = route.params;

  const [tableHead, setTableHead] = useState(["", "", ""]);
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width;
  const [widthArr, setWidthArr] = useState([
    screenWidth * 0.1,
    screenWidth * 0.6,
    screenWidth * 0.3,
  ]);

  useEffect(() => {
    if (type === "users") {
      setTableHead(["ID", "User Name", "Actions"]);
      AllUsers();
    } else if (type === "courses") {
      setTableHead(["ID", "Course Name", "Actions"]);
      AllCourses();
    } else {
      setTableHead(["ID", "Question Text", "Actions"]);
      AllQuestions();
    }
  }, [type]);

  const { authState } = useAuth();

  const AllQuestions = async () => {
    try {
      const questionApi = new QuestionControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      const response = await questionApi.indexQuestions();
      const questions = response.data.map((question: any) => ({
        id: question.id,
        questionText: question.libelle,
      }));
      setDataList(questions);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const AllCourses = async () => {
    try {
      const courseApi = new CoursControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      const response = await courseApi.indesCours();
      const courses = response.data.map((course: any) => ({
        id: course.id,
        courseName: course.titre,
      }));
      setDataList(courses);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const AllUsers = async () => {
    try {
      const userApi = new UserControllerApi(
        environment,
        environment.basePath,
        axiosInstance
      );
      const response = await userApi.indexUsers();
      const users = response.data.map((user: any) => ({
        id: user.id,
        username: user.username,
      }));
      setDataList(users);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderRows = () => {
    return dataList.map((rowData, index) => (
      <Row
        key={index}
        data={[
          rowData.id,
          type === "users"
            ? rowData.username
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
        style={{
          ...QuestionDetailsStyle.row,
          ...(index % 2 && { backgroundColor: "#F7F6E7" }),
        }}
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
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  style={{ marginTop: 20 }}
                />
              ) : (
                renderRows()
              )}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default QuestionDetails;
