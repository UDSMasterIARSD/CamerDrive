package com.example.backend.repositories;

import com.example.backend.models.Questions;
import com.example.backend.models.Quiz;
import com.example.backend.models.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
    List<QuizQuestion> findByQuiz(Quiz quiz);
}
