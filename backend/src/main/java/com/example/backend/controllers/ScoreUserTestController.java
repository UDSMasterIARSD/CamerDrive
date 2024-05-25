package com.example.backend.controllers;

import com.example.backend.services.ScoreUserTestService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/score_user_test")
public class ScoreUserTestController {

    @Autowired
    private ScoreUserTestService userAnswerService;

}
