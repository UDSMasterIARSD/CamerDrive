package com.example.backend.controllers;

import com.example.backend.repositories.QuestionRepository;
import com.example.backend.repositories.ScoreUserTestRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.ScoreUserTestService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/score_user_test")
public class ScoreUserTestController {

    private final ScoreUserTestService userAnswerService;

//    private UserRepository userRepo;
//
//    private QuestionRepository questionRepo;
//
//    private ScoreUserTestRepository scoreUserTestRepo;


}
