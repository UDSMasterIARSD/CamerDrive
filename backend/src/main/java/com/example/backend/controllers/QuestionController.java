package com.example.backend.controllers;

import com.example.backend.models.Questions;
import com.example.backend.services.QuestionService;
import com.example.backend.services.QuestionServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Questions")
@AllArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping("/addquestion")
    public Questions createQuestion(@RequestBody Questions question){
        return questionService.createQuestion(question);
    }
    @GetMapping("/{id}")
    public Questions getQuestionById(@PathVariable Long id){
        return questionService.getQuestionById(id);
    }
    @PutMapping("/{id}")
    public Questions updateQuestion(@PathVariable Long id, @RequestBody Questions question){
       return questionService.updateQuestion(id, question);
    }
    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestion(id);
    }

    @GetMapping("/getAllQuestion")
    public List<Questions> getAllQuestions(){
        System.out.println("Inside Get all questions");
        return questionService.getAllQuestions();
    }


}
