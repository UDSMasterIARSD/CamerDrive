package com.example.backend.repositories;

import com.example.backend.models.ScoreUserTest;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreUserTestRepository extends JpaRepository<ScoreUserTest, Long> {
    List<User> findByTestId(Long testId);
}
