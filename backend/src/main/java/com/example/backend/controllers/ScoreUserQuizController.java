package com.example.backend.controllers;

import com.example.backend.dto.ScoreUserQuizRequest;
import com.example.backend.dto.ScoreUserQuizResponse;
import com.example.backend.repositories.ScoreUserQuizRepository;
import com.example.backend.services.ScoreUserQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/score_user_quiz")
public class ScoreUserQuizController {

    @Autowired
    private ScoreUserQuizService userQuizService;

    @Autowired
    private ScoreUserQuizRepository userQuizRepo;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    @Transactional(readOnly = true)
    public List<ScoreUserQuizResponse> indexScoreUserQuiz() {
        return userQuizService.getAllUserQuiz();
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ScoreUserQuizResponse createUserQuiz(@RequestBody ScoreUserQuizRequest request) {
        return userQuizService.createUserQuiz(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserQuiz(@PathVariable Long id) {
        userQuizService.deleteUserQuiz(id);
    }

}
