package com.example.backend.services;

import com.example.backend.dto.ScoreUserTestRequest;
import com.example.backend.dto.ScoreUserTestResponse;
import com.example.backend.dto.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ScoreUserTestService {

    public ScoreUserTestResponse createUserTest(ScoreUserTestRequest userTest);

    public List<UserResponse> getUserByTestId(Long testId);

    public ScoreUserTestResponse updateUserTest(Long id, ScoreUserTestRequest updatedUserAnswer);

    public void deleteUserTest(Long id);

    public List<ScoreUserTestResponse> getAllUserTest();
}
