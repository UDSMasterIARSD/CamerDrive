package com.example.backend.services;

import com.example.backend.models.Questions;

import java.util.List;

public interface QuestionService {

    public Questions createQuestion(Questions question);

    public Questions getQuestionById(Long id);

    public Questions updateQuestion(Long id, Questions updatedQuestion);

    public void deleteQuestion(Long id);

    public List<Questions> getAllQuestions();
}
