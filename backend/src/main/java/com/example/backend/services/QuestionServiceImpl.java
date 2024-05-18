package com.example.backend.services;

import com.example.backend.dto.QuestionRequest;
import com.example.backend.dto.QuestionResponse;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Question;
import com.example.backend.repositories.QuestionRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService{
    
    private final QuestionRepository questionRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<QuestionResponse> index(){
        Pageable pageable = Pageable.ofSize(15);
        return questionRepo.findAll(pageable).stream().map(el ->
                mapper.map(el, QuestionResponse.class)).toList();
    }

    @Override
    public QuestionResponse show(Long id){
        Question question = questionRepo.findById(id).orElseThrow(() ->
                new NotFoundException("La Question ", "d'id: ", id));
        return mapper.map(question, QuestionResponse.class);
    }
    
    @Override
    public QuestionResponse create(QuestionRequest question){
        Question req = mapper.map(question, Question.class);
        return mapper.map(questionRepo.save(req), QuestionResponse.class);
    }

    @Override
    public QuestionResponse update(Long id, QuestionRequest updated){
        Question old = questionRepo.findById(id).orElseThrow(() ->
                new NotFoundException("La question que vous voulez modifier ", "d'id: ", id));
        Question newQuestion = mapper.map(updated, Question.class);
        newQuestion.setId(id);
        return mapper.map(questionRepo.save(newQuestion), QuestionResponse.class);
    }

    @Override
    public void delete(Long id){
        Question question = questionRepo.findById(id).orElseThrow(() ->
                new NotFoundException("La Question que vous voulez supprimer ", "d'id: ", id));
        questionRepo.delete(question);
    }
}
