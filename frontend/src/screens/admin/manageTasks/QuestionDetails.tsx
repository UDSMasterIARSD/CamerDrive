import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Header from "@/components/Header";

import { Row, Table } from "react-native-table-component";
import {
  ConceptControllerApi,
  CoursControllerApi,
  QuestionControllerApi,
  QuizControllerApi,
  UserControllerApi,
} from "../../../../generated/index";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "../../../environments/axiosInstance";
import environment from "../../../environments/environment";
import QuestionDetailsStyle from "./QuestionDetailsStyles";

type QuestionDetailsRouteParams = {
  params: {
    type: "users" | "courses" | "questions" | "concepts" | "quizzes";
  };
};

type DataItem = {
  id: number;
  username?: string;
  courseName?: string;
  conceptTitle?: string;
  quizTitle?: string;
  questionText?: string;
};

const QuestionDetails = () => {
  const route = useRoute<RouteProp<QuestionDetailsRouteParams, "params">>();
  const { type } = route.params;
  const navigation = useNavigation<NavigationProp<any>>();
  const [tableHead, setTableHead] = useState(["", "", ""]);
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get("window").width;
  const [widthArr, setWidthArr] = useState([
    screenWidth * 0.1,
    screenWidth * 0.6,
    screenWidth * 0.3,
  ]);
  const [refresh, setRefresh] = useState(false);

  const { authState } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      if (type === "users") {
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
      } else if (type === "courses") {
        const courseApi = new CoursControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await courseApi.indexCours();
        const courses = response.data.map((course: any) => ({
          id: course.id,
          courseName: course.titre,
        }));
        setDataList(courses);
      } else if (type === "concepts") {
        const conceptApi = new ConceptControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await conceptApi.indexConcepts();
        const concepts = response.data.map((concept: any) => ({
          id: concept.id,
          conceptTitle: concept.titre,
        }));
        setDataList(concepts);
      } else if (type === "quizzes") {
        const quizApi = new QuizControllerApi(
          environment,
          environment.basePath,
          axiosInstance
        );
        const response = await quizApi.indexQuizzes();
        const quizzes = response.data.map((quiz: any) => ({
          id: quiz.id,
          quizTitle: quiz.titre,
        }));
        setDataList(quizzes);
      } else {
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
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type === "users") {
      setTableHead(["ID", "Nom d'utilisateur", "Actions"]);
    } else if (type === "courses") {
      setTableHead(["ID", "Titre du Cours", "Actions"]);
    } else if (type === "concepts") {
      setTableHead(["ID", "Titre du Concept", "Actions"]);
    } else if (type === "quizzes") {
      setTableHead(["ID", "Titre du Quiz", "Actions"]);
    } else {
      setTableHead(["ID", "Libelle Question", "Actions"]);
    }
    fetchData();
  }, [type, refresh]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [type, refresh])
  );

  const handleDelete = (id: number) => {
    Alert.alert(
      "Supprimer l'entrée",
      `Etes vous sure de vouloir supprimer ce ${type.slice(0, -1)}?`,
      [
        {
          text: "Non",
          onPress: () => console.log("Suppression annulee"),
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: async () => {
            try {
              if (type === "questions") {
                const questionApi = new QuestionControllerApi(
                  environment,
                  environment.basePath,
                  axiosInstance
                );
                await questionApi.deleteQuestion(id);
              } else if (type === "courses") {
                const courseApi = new CoursControllerApi(
                  environment,
                  environment.basePath,
                  axiosInstance
                );
                await courseApi.deleteCours(id);
              } else if (type === "users") {
                const userApi = new UserControllerApi(
                  environment,
                  environment.basePath,
                  axiosInstance
                );
                await userApi.deleteUser(id);
              } else if (type === "concepts") {
                const conceptApi = new ConceptControllerApi(
                  environment,
                  environment.basePath,
                  axiosInstance
                );
                await conceptApi.delete1(id);
              } else if (type === "quizzes") {
                const quizApi = new QuizControllerApi(
                  environment,
                  environment.basePath,
                  axiosInstance
                );
                await quizApi.deleteQuiz(id);
              }
              Alert.alert(
                "Success",
                `${type.slice(0, -1)} Entrée supprimée avec succès`
              );
              fetchData();
            } catch (error) {
              console.log(error);
              Alert.alert(
                "Erreure",
                `Echec lors de la suppression  ${type.slice(0, -1)}`
              );
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleEdit = (id: number) => {
    navigation.navigate("EditForm", { type, id });
  };

  const handleDetails = (id: number) => {
    navigation.navigate("DetailsPage", { type, id });
  };

  const renderRows = () => {
    return dataList.map((rowData, index) => (
      <Row
        key={index}
        data={[
          <TouchableOpacity>
            <Text style={QuestionDetailsStyle.textCenter}>{index}</Text>
          </TouchableOpacity>,
          <TouchableOpacity onPress={() => handleDetails(rowData.id)}>
            <Text style={QuestionDetailsStyle.textCenter}>
              {type === "users"
                ? rowData.username
                : type === "courses"
                ? rowData.courseName
                : type === "concepts"
                ? rowData.conceptTitle
                : type === "quizzes"
                ? rowData.quizTitle
                : rowData.questionText}
            </Text>
          </TouchableOpacity>,
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

  const handleAdd = () => {
    navigation.navigate("AddForm", { type });
  };

  return (
    <>
      {type === "users" ? (
        <Header titre={"Liste des Utilisateurs"} />
      ) : type === "courses" ? (
        <Header titre={"Liste des Cours"} />
      ) : type === "concepts" ? (
        <Header titre={"Liste des Concepts"} />
      ) : type === "quizzes" ? (
        <Header titre={"Liste des Quiz"} />
      ) : (
        <Header titre={"Liste des Questions"} />
      )}

      <View style={QuestionDetailsStyle.container}>
        <View style={QuestionDetailsStyle.titleHeader}>
          <TouchableOpacity onPress={() => handleAdd()}>
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
                textStyle={{
                  ...QuestionDetailsStyle.text,
                  textAlign: "center",
                }}
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
    </>
  );
};

export default QuestionDetails;
