package com.example.backend.controllers;

import com.example.backend.services.ScoreUserQuizService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/score_user_test")
public class ScoreUserQuizController {

    @Autowired
    private ScoreUserQuizService userAnswerService;

}
