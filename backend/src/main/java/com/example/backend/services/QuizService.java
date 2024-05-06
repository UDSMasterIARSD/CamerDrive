package com.example.backend.services;

import com.example.backend.models.Questions;
import com.example.backend.models.Quiz;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface QuizService {

    public Quiz createQuiz(Quiz quiz);

    public Quiz getQuizById(Long id);

    public Quiz updateQuiz(Long id, Quiz updatedQuiz);

    public void deleteQuiz(Long id);

    public List<Quiz> getAllQuizzes();

    public List<Questions> getQuizQuestById(Long id);
}
