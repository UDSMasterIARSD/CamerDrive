package com.example.backend.services;

import com.example.backend.dto.TestRequest;
import com.example.backend.dto.TestResponse;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Test;
import com.example.backend.repositories.TestRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<TestResponse> index() {
        Pageable pageable = Pageable.ofSize(15);
        return testRepo.findAll(pageable).stream().map(el ->
                mapper.map(el, TestResponse.class)).toList();
    }

    @Override
    public TestResponse show(Long id) {
        Test test = testRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Test ", "d'id: ", id));
        return mapper.map(test, TestResponse.class);
    }

    @Override
    public TestResponse create(TestRequest test) {
        Test req = mapper.map(test, Test.class);
        return mapper.map(testRepo.save(req), TestResponse.class);
    }

    @Override
    public TestResponse update(TestRequest test, Long id) {
        Test req = testRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Test que vous voulez modifier ", "d'id: ", id));
        req.setId(id);
        return mapper.map(testRepo.save(req), TestResponse.class);
    }

    @Override
    public void delete(Long id) {
        Test test = testRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Test que vous voulez supprimer ", "d'id: ", id));
        testRepo.delete(test);
    }
}
