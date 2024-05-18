interface Question {
  id: number;
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
}

const QuestionList: Question[] = [
  {
    id: 1,
    questionText: "What is the minimum age to obtain a learner's permit?",
    option1: "14 years",
    option2: "16 years",
    option3: "18 years",
    option4: "21 years",
    correctOption: "16 years",
  },
  {
    id: 2,
    questionText: "What does a solid red traffic light mean?",
    option1: "Stop",
    option2: "Yield",
    option3: "Go",
    option4: "Caution",
    correctOption: "Stop",
  },
  {
    id: 3,
    questionText: "When can you turn right at a red light?",
    option1: "After a complete stop and if no sign prohibits it",
    option2: "When the intersection is clear",
    option3: "Immediately",
    option4: "Never",
    correctOption: "After a complete stop and if no sign prohibits it",
  },
  {
    id: 4,
    questionText:
      "What is the legal blood alcohol concentration (BAC) limit for drivers over 21 in most states?",
    option1: "0.02%",
    option2: "0.05%",
    option3: "0.08%",
    option4: "0.10%",
    correctOption: "0.08%",
  },
  {
    id: 5,
    questionText: "When should you use your high-beam headlights?",
    option1: "When driving in fog",
    option2: "When driving in heavy rain",
    option3: "On open roads with no oncoming traffic",
    option4: "In city traffic",
    correctOption: "On open roads with no oncoming traffic",
  },
  {
    id: 6,
    questionText: "What does a flashing yellow traffic light mean?",
    option1: "Stop",
    option2: "Yield",
    option3: "Caution",
    option4: "Go",
    correctOption: "Caution",
  },
  {
    id: 7,
    questionText:
      "What is the first thing you should do when you get into your car?",
    option1: "Adjust the mirrors",
    option2: "Start the engine",
    option3: "Fasten your seatbelt",
    option4: "Check the fuel gauge",
    correctOption: "Fasten your seatbelt",
  },
  {
    id: 8,
    questionText: "How far should you park from a fire hydrant?",
    option1: "5 feet",
    option2: "10 feet",
    option3: "15 feet",
    option4: "20 feet",
    correctOption: "15 feet",
  },
  {
    id: 9,
    questionText: "What should you do if you miss your exit on the highway?",
    option1: "Stop and reverse",
    option2: "Take the next exit",
    option3: "Make a U-turn",
    option4: "Pull over and check the map",
    correctOption: "Take the next exit",
  },
  {
    id: 10,
    questionText: "What is the hand signal for a left turn?",
    option1: "Left arm extended straight out",
    option2: "Left arm bent upward",
    option3: "Left arm bent downward",
    option4: "Right arm extended straight out",
    correctOption: "Left arm extended straight out",
  },
  {
    id: 11,
    questionText:
      "What should you do if an emergency vehicle is approaching with flashing lights?",
    option1: "Speed up",
    option2: "Maintain your speed",
    option3: "Pull over to the right and stop",
    option4: "Ignore it",
    correctOption: "Pull over to the right and stop",
  },
  {
    id: 12,
    questionText:
      "What does a double yellow line in the center of a road mean?",
    option1: "Passing is allowed in both directions",
    option2: "Passing is not allowed in either direction",
    option3: "Passing is allowed on the left side",
    option4: "Passing is allowed on the right side",
    correctOption: "Passing is not allowed in either direction",
  },
  {
    id: 13,
    questionText: "How should you enter an expressway?",
    option1: "Slowly and carefully",
    option2: "Quickly, matching the speed of traffic",
    option3: "Stop and check for traffic",
    option4: "From the left lane",
    correctOption: "Quickly, matching the speed of traffic",
  },
  {
    id: 14,
    questionText: "When are road surfaces most slippery?",
    option1: "During a heavy rainstorm",
    option2: "During the first few minutes of rainfall",
    option3: "When it's snowing",
    option4: "When it's foggy",
    correctOption: "During the first few minutes of rainfall",
  },
  {
    id: 15,
    questionText: "What does a stop sign mean?",
    option1: "Yield",
    option2: "Caution",
    option3: "Stop if necessary",
    option4: "Stop completely",
    correctOption: "Stop completely",
  },
  {
    id: 16,
    questionText: "How often should you check your rearview mirrors?",
    option1: "Every 5-10 seconds",
    option2: "Every 15-30 seconds",
    option3: "Every 1-2 minutes",
    option4: "Only when you need to change lanes",
    correctOption: "Every 5-10 seconds",
  },
  {
    id: 17,
    questionText: "What is the purpose of the '3-second rule'?",
    option1: "To determine a safe following distance",
    option2: "To measure stopping distance",
    option3: "To calculate speed",
    option4: "To determine fuel efficiency",
    correctOption: "To determine a safe following distance",
  },
  {
    id: 18,
    questionText: "What should you do if you are involved in a minor accident?",
    option1: "Leave the scene immediately",
    option2: "Exchange information with the other driver",
    option3: "Call the police and wait in your car",
    option4: "Argue with the other driver",
    correctOption: "Exchange information with the other driver",
  },
  {
    id: 19,
    questionText:
      "What is the minimum safe following distance under ideal conditions?",
    option1: "1 second",
    option2: "2 seconds",
    option3: "3 seconds",
    option4: "4 seconds",
    correctOption: "3 seconds",
  },
  {
    id: 20,
    questionText:
      "When approaching a school bus with flashing red lights, you should:",
    option1: "Continue driving slowly",
    option2: "Pass the bus carefully",
    option3: "Stop regardless of your direction",
    option4: "Speed up to pass quickly",
    correctOption: "Stop regardless of your direction",
  },
];

export default QuestionList;
