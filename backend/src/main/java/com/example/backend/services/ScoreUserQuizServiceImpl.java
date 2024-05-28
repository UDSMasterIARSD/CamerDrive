package com.example.backend.services;

import com.example.backend.dto.ScoreUserQuizRequest;
import com.example.backend.dto.ScoreUserQuizResponse;
import com.example.backend.dto.UserResponse;
import com.example.backend.models.ScoreUserQuiz;
import com.example.backend.repositories.ScoreUserQuizRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreUserQuizServiceImpl implements ScoreUserQuizService {

    @Autowired
    private ScoreUserQuizRepository scoreUserQuizRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<ScoreUserQuizResponse> getAllUserQuiz(){
        return scoreUserQuizRepo.findAll().stream().map(el ->
                mapper.map(el, ScoreUserQuizResponse.class)).toList();
    }

    @Override
    public List<UserResponse> getUserByQuizId(Long quizId) {
        return scoreUserQuizRepo.findByQuizId(quizId).stream().map(el ->
                mapper.map(el, UserResponse.class)).toList();
    }

    @Override
    public ScoreUserQuizResponse createUserQuiz(ScoreUserQuizRequest req){
        Optional<ScoreUserQuiz> optional = scoreUserQuizRepo.findByUserIdAndQuizId(req.getUser().getId(), req.getQuiz().getId());
        ScoreUserQuizResponse resp;
        if (optional.isPresent()) {
            resp = updateUserQuiz(optional.get().getId(), req);
        } else {
            ScoreUserQuiz userQuiz = mapper.map(req, ScoreUserQuiz.class);
            resp = mapper.map(scoreUserQuizRepo.save(userQuiz), ScoreUserQuizResponse.class);
        }
        return resp;
    }

    @Override
    public ScoreUserQuiz getUserQuizById(Long id){
        return scoreUserQuizRepo.findById(id).orElseThrow(()-> new EntityNotFoundException("User Answer not found"));
    }

    @Override
    public ScoreUserQuizResponse updateUserQuiz(Long id, ScoreUserQuizRequest req){
        ScoreUserQuiz userQuiz = getUserQuizById(id);
        ScoreUserQuiz newUserQuiz = mapper.map(req, ScoreUserQuiz.class);
        newUserQuiz.setId(id);
        return mapper.map(scoreUserQuizRepo.save(newUserQuiz), ScoreUserQuizResponse.class);
    }

    @Override
    public void deleteUserQuiz(Long id){
        ScoreUserQuiz req = getUserQuizById(id);
        scoreUserQuizRepo.delete(req);
    }
}
