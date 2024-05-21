package com.example.backend.repositories;

import com.example.backend.models.ScoreUserQuiz;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ScoreUserQuizRepository extends JpaRepository<ScoreUserQuiz, Long> {
    Collection<User> findByQuizId(Long quizId);
}
