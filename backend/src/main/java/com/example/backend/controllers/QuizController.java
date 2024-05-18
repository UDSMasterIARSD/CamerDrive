package com.example.backend.controllers;

import com.example.backend.dto.QuizRequest;
import com.example.backend.dto.QuizResponse;
import com.example.backend.models.Question;
import com.example.backend.models.Quiz;
import com.example.backend.services.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
@AllArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/")
    public List<QuizResponse> indexQuizzes(){
        return quizService.index();
    }

//    @GetMapping("/getQuizQuestById/{id}")
//    public List<Question> getQuizQuestById(@PathVariable Long id){
//        System.out.println("Inside Get Quiz by Id");
//        return quizService.getQuizQuestById(id);
//    }

    @GetMapping("/{id}")
    public QuizResponse showQuiz(@PathVariable Long id){
    return quizService.show(id);
    }

    @PostMapping("/")
    public QuizResponse createQuiz(@RequestBody QuizRequest quiz){
        return quizService.create(quiz);
    }

    @PutMapping("/{id}")
    public QuizResponse updateQuiz(@PathVariable Long id, @RequestBody QuizRequest quiz){
        return quizService.update(id, quiz);
    }

    @DeleteMapping("/{id}")
    public void deleteQuiz(@PathVariable Long id){
        quizService.delete(id);
    }
}
