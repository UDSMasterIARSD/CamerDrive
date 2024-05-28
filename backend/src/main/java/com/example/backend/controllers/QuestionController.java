package com.example.backend.controllers;

import com.example.backend.dto.QuestionRequest;
import com.example.backend.dto.QuestionResponse;
import com.example.backend.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    @Transactional(readOnly = true)
    public List<QuestionResponse> indexQuestions(){
        return questionService.index();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @Transactional(readOnly = true)
    public QuestionResponse showQuestion(@PathVariable Long id){
        return questionService.show(id);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public QuestionResponse createQuestion(@RequestBody QuestionRequest question){
        return questionService.create(question);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public QuestionResponse updateQuestion(@PathVariable Long id, @RequestBody QuestionRequest question){
       return questionService.update(id, question);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuestion(@PathVariable Long id){
        questionService.delete(id);
    }

}
