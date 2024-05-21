import { Ionicons } from "@expo/vector-icons";

export interface Task {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}

const tasks: Task[] = [
  { icon: "help-circle-outline", text: "Question Management" }, // Gestion des questions
  { icon: "clipboard-outline", text: "Quiz Management" }, // Gestion des quiz
  { icon: "archive-outline", text: "Past Papers Management" }, // Gestion des anciens sujets
  { icon: "people-outline", text: "User Management" }, // Gestion des utilisateurs
  { icon: "school-outline", text: "Courses Management" }, // Gestion des statistiques
  { icon: "checkmark-circle-outline", text: "Test Management" }, // Gestion des tests
  { icon: "book-outline", text: "Concepts Management" }, // Gestion des concepts
];

export default tasks;
