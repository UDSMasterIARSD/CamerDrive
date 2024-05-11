package com.example.backend.services;

import com.example.backend.models.UserAnswer;
import com.example.backend.repositories.UserAnswerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserAnswerServiceImpl implements UserAnswerService{

    private final UserAnswerRepository userAnswerRepository;

    @Override
    public UserAnswer createUserAnswer(UserAnswer userAnswer){
        return userAnswerRepository.save(userAnswer);
    }

    public UserAnswer getUserAnswerById(Long id){
        return userAnswerRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("User Answer not found"));
    }

    public UserAnswer updateUserAnswer(Long id, UserAnswer updatedUserAnswer){
        UserAnswer userAnswer = getUserAnswerById(id);
        userAnswer.setUser(updatedUserAnswer.getUser());
        userAnswer.setQuestion(updatedUserAnswer.getQuestion());
        userAnswer.setSelectedOption(updatedUserAnswer.getSelectedOption());
        return userAnswerRepository.save(userAnswer);
    }

    public void deleteUserAnswer(Long id){
        UserAnswer userAnswer = getUserAnswerById(id);
        userAnswerRepository.delete(userAnswer);
    }

    public List<UserAnswer> getAllUserAnswers(){
        return userAnswerRepository.findAll();
    }
}
