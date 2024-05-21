import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import QuestionDetailsPage from "./questions/QuestionDetailsPage";
//import EditUserForm from "./EditUserForm";
//import EditCourseForm from "./EditCourseForm";

type DetailsPageRouteParams = {
  params: {
    type: "users" | "courses" | "questions";
    id: number;
  };
};

const DetailsPage = () => {
  const route = useRoute<RouteProp<DetailsPageRouteParams, "params">>();
  const { type, id } = route.params;

  if (type === "questions") {
    return <QuestionDetailsPage id={id} />;
  } else if (type === "courses") {
    // return <EditCourseForm id={id} />;
  } else if (type === "users") {
    // return <EditUserForm id={id} />;
  } else {
    return null;
  }
};

export default DetailsPage;
