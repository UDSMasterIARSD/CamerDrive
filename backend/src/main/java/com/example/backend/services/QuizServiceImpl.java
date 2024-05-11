package com.example.backend.services;

import com.example.backend.models.Questions;
import com.example.backend.models.Quiz;
import com.example.backend.models.QuizQuestion;
import com.example.backend.repositories.QuestionRepository;
import com.example.backend.repositories.QuizQuestionRepository;
import com.example.backend.repositories.QuizRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class QuizServiceImpl implements QuizService{

    private final QuizRepository quizRepository;

    private QuizQuestionRepository quizQuestionRepository;

    private QuestionRepository questionRepository;

    @Override
    public Quiz createQuiz(Quiz quiz){
        return quizRepository.save(quiz);
    }

    public Quiz getQuizById(Long id){
        return quizRepository.findById(id).orElseThrow(()-> new RuntimeException("Quiz not found"));
    }

    public Quiz updateQuiz(Long id, Quiz updatedQuiz){
        Quiz quiz = getQuizById(id);
        quiz.setQuizName(updatedQuiz.getQuizName());

            List<QuizQuestion> existingQuestions = quiz.getQuizQuestion();

            existingQuestions.clear();

            List<QuizQuestion> updatedQuestions = new ArrayList<>();
            for (QuizQuestion updatedQuestion : updatedQuiz.getQuizQuestion()) {
                QuizQuestion quizQuestion = new QuizQuestion();

                quizQuestion.setQuiz(quiz);
                quizQuestion.setQuestion(updatedQuestion.getQuestion());
                updatedQuestions.add(quizQuestion);
            }

            quiz.setQuizQuestion(updatedQuestions);

        return quizRepository.save(quiz);
    }

    public void deleteQuiz(Long id){
        Quiz quiz = getQuizById(id);
        quizRepository.delete(quiz);
    }

    public List<Quiz> getAllQuizzes(){
        return quizRepository.findAll();
    }

    public List<Questions> getQuizQuestById(Long id){
        System.out.println("Id"+id);
        List<QuizQuestion> quizQuestList = quizQuestionRepository.findByQuiz(getQuizById(id));
        List<Questions> questionList = new ArrayList<>();
        for (QuizQuestion quizQues: quizQuestList){
            Optional<Questions> optionalQuestions = questionRepository.findById(quizQues.getQuestion().getId());
            optionalQuestions.ifPresent(questionList::add);
        }

        questionList.forEach(q->System.out.println(q.getQuestionText()));
        return questionList;

    }

}
