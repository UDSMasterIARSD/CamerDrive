package com.example.backend.repositories;

import com.example.backend.dto.UserResponse;
import com.example.backend.models.ScoreUserTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreUserTestRepository extends JpaRepository<ScoreUserTest, Long> {
    List<UserResponse> findByTestId(Long testId);
}
