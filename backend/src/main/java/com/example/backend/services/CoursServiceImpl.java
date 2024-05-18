package com.example.backend.services;

import com.example.backend.dto.CoursRequest;
import com.example.backend.dto.CoursResponse;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Cours;
import com.example.backend.repositories.CoursRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CoursServiceImpl implements CoursService {

    @Autowired
    private CoursRepository coursRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<CoursResponse> index() {
        Pageable pageable = Pageable.ofSize(15);
        return coursRepo.findAll(pageable).stream().map(el ->
                mapper.map(el, CoursResponse.class)).toList();
    }

    @Override
    public CoursResponse show(Long id) {
        Cours cours = coursRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Cours ", "d'id: ", id));
        return mapper.map(cours, CoursResponse.class);
    }

    @Override
    public CoursResponse create(CoursRequest cours) {
        Cours req = mapper.map(cours, Cours.class);
        return mapper.map(coursRepo.save(req), CoursResponse.class);
    }

    @Override
    public CoursResponse update(CoursRequest cours, Long id) {
        Cours req = coursRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le cours que vous voulez modifier ", "d'id: ", id));
        Cours newCours = mapper.map(cours, Cours.class);
        newCours.setId(id);
        return mapper.map(coursRepo.save(newCours), CoursResponse.class);
    }

    @Override
    public void delete(Long id) {
        Cours cours = coursRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le cours que vous voulez supprimer ", "d'id: ", id));
        coursRepo.delete(cours);
    }
}