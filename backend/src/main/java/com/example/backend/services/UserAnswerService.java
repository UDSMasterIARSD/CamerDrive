package com.example.backend.services;

import com.example.backend.models.UserAnswer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserAnswerService {

    public UserAnswer createUserAnswer(UserAnswer userAnswer);

    public UserAnswer getUserAnswerById(Long id);

    public UserAnswer updateUserAnswer(Long id, UserAnswer updatedUserAnswer);

    public void deleteUserAnswer(Long id);

    public List<UserAnswer> getAllUserAnswers();
}
