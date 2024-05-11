package com.example.backend.services;

import com.example.backend.models.Questions;
import com.example.backend.repositories.QuestionRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService{
    
    private final QuestionRepository questionRepository;
    
    @Override
    public Questions createQuestion(Questions question){
        return questionRepository.save(question);
    }
    
    public Questions getQuestionById(Long id){
        return questionRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Question not found"));
    }

    public Questions updateQuestion(Long id, Questions updatedQuestion){
        Questions question = getQuestionById(id);
        question.setQuestionText(updatedQuestion.getQuestionText());
        question.setOption1(updatedQuestion.getOption1());
        question.setOption2(updatedQuestion.getOption2());
        question.setOption3(updatedQuestion.getOption3());
        question.setOption4(updatedQuestion.getOption4());
        question.setCorrectOption(updatedQuestion.getCorrectOption());
        return questionRepository.save(question);
    }

    public void deleteQuestion(Long id){
        Questions question = getQuestionById(id);
        questionRepository.delete(question);
    }

    public List<Questions> getAllQuestions(){
        return questionRepository.findAll();
    }
}
