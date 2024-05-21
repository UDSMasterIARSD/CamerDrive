export interface Test {
  id: number;
  status: "PASSED" | "FAILED";
  numberOfQuestions: number;
  numberOfCorrectAnswers: number;
  Time: number;
}

export const TestData: Test[] = [
  {
    id: 1,
    status: "PASSED",
    numberOfQuestions: 30,
    numberOfCorrectAnswers: 20,
    Time: 30,
  },
  {
    id: 2,
    status: "FAILED",
    numberOfQuestions: 30,
    numberOfCorrectAnswers: 10,
    Time: 20,
  },
  {
    id: 3,
    status: "FAILED",
    numberOfQuestions: 50,
    numberOfCorrectAnswers: 20,
    Time: 40,
  },
  {
    id: 4,
    status: "PASSED",
    numberOfQuestions: 50,
    numberOfCorrectAnswers: 48,
    Time: 45,
  },
  {
    id: 5,
    status: "FAILED",
    numberOfQuestions: 20,
    numberOfCorrectAnswers: 8,
    Time: 15,
  },
  {
    id: 6,
    status: "PASSED",
    numberOfQuestions: 50,
    numberOfCorrectAnswers: 30,
    Time: 30,
  },
];
