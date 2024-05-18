package com.example.backend.services;

import com.example.backend.dto.ScoreUserTestRequest;
import com.example.backend.dto.ScoreUserTestResponse;
import com.example.backend.dto.UserResponse;
import com.example.backend.models.ScoreUserTest;
import com.example.backend.repositories.ScoreUserTestRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ScoreUserTestServiceImpl implements ScoreUserTestService {

    private final ScoreUserTestRepository scoreUserTestRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<ScoreUserTestResponse> getAllUserTest(){
        return scoreUserTestRepo.findAll().stream().map(el ->
                mapper.map(el, ScoreUserTestResponse.class)).toList();
    }

    @Override
    public List<UserResponse> getUserByTestId(Long testId) {
        return scoreUserTestRepo.findByTestId(testId).stream().map(el ->
                mapper.map(el, UserResponse.class)).toList();
    }

    @Override
    public ScoreUserTestResponse createUserTest(ScoreUserTestRequest req){
        ScoreUserTest userTest = mapper.map(req, ScoreUserTest.class);
        return mapper.map(scoreUserTestRepo.save(userTest), ScoreUserTestResponse.class);
    }

    public ScoreUserTest getUserTestById(Long id){
        return scoreUserTestRepo.findById(id).orElseThrow(()-> new EntityNotFoundException("User Answer not found"));
    }

    @Override
    public ScoreUserTestResponse updateUserTest(Long id, ScoreUserTestRequest req){
        ScoreUserTest userTest = getUserTestById(id);
        ScoreUserTest newUserTest = mapper.map(req, ScoreUserTest.class);
        newUserTest.setId(id);
        return mapper.map(scoreUserTestRepo.save(newUserTest), ScoreUserTestResponse.class);
    }

    @Override
    public void deleteUserTest(Long id){
        ScoreUserTest req = getUserTestById(id);
        scoreUserTestRepo.delete(req);
    }
}