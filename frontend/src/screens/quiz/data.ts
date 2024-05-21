// data.ts
export interface Question {
    id: number;
    libelle: string;
    option1: string;
    option2: string;
    option3?: string;
    option4?: string;
    correctOption: string;
  }
  
  export interface Quiz {
    id: number;
    title: string;
    courseId: number;
    questions: Question[];
  }
  
  export const quizzes: Quiz[] = [
    {
      id: 1,
      title: "Quiz 1",
      courseId: 101,
      questions: [
        {
          id: 1,
          libelle: "Question 1.1",
          option1: "Option 1",
          option2: "Option 2",
          option3: "Option 3",
          option4: "Option 4",
          correctOption: "Option 1",
        },
      ],
    },
    {
      id: 2,
      title: "Quiz 2",
      courseId: 102,
      questions: [
        {
          id: 1,
          libelle: "Question 2.1",
          option1: "Option 1",
          option2: "Option 2",
          correctOption: "Option 2",
        },
      ],
    },
  ];
  