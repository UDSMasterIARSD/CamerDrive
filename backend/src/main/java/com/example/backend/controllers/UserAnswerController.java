package com.example.backend.controllers;

import com.example.backend.repositories.QuestionRepository;
import com.example.backend.repositories.UserAnswerRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.UserAnswerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@AllArgsConstructor
@RestController
@RequestMapping("/userAnswers")
public class UserAnswerController {

    private final UserAnswerService userAnswerService;

    private UserRepository userRepository;

    private QuestionRepository questionRepository;

    private UserAnswerRepository userAnswerRepository;


}
