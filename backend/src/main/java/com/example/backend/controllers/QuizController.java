package com.example.backend.controllers;

import com.example.backend.models.Questions;
import com.example.backend.models.Quiz;
import com.example.backend.models.QuizQuestion;
import com.example.backend.services.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/quizzes")
public class QuizController {

    private final QuizService quizService;
    @PostMapping
    public Quiz createQuiz(@RequestBody Quiz quiz){
        List<QuizQuestion> quizQuestions = quiz.getQuizQuestion();
        for (QuizQuestion quizQuestion: quizQuestions){
            quizQuestion.setQuiz(quiz);
        }
        return quizService.createQuiz(quiz);
    }
    @GetMapping("/{id}")
    public Quiz getQuizById(@PathVariable Long id){
        return quizService.getQuizById(id);
    }
    @PutMapping("/{id}")
    public Quiz updateQuiz(@PathVariable Long id, @RequestBody Quiz quiz){
        return quizService.updateQuiz(id, quiz);
    }
    @DeleteMapping("/{id}")
    public void deleteQuiz(@PathVariable Long id){
        quizService.deleteQuiz(id);
    }
    @GetMapping
    public List<Quiz> getAllQuizzes(){
        return quizService.getAllQuizzes();
    }
    @GetMapping("/getQuizQuestById/{id}")
    public List<Questions> getQuizQuestById(@PathVariable Long id){
        System.out.println("Inside Get Quiz by Id");
        return quizService.getQuizQuestById(id);
    }
}
