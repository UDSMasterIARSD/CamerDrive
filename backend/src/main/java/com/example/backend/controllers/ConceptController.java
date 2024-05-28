package com.example.backend.controllers;

import com.example.backend.dto.ConceptRequest;
import com.example.backend.dto.ConceptResponse;
import com.example.backend.dto.CoursResponse;
import com.example.backend.services.ConceptService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/concepts")
public class ConceptController {

    @Autowired
    private ConceptService conceptService;


    @GetMapping("/")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public List<ConceptResponse> indexConcepts(){
        return conceptService.index();
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public ConceptResponse showConcept(@PathVariable Long id) {
        return conceptService.show(id);
    }

    @GetMapping("/getCours/{id}")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public CoursResponse getCours(@PathVariable Long id) {
        return conceptService.getCours(id);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ConceptResponse create(@Valid @RequestBody ConceptRequest concept) {
        return conceptService.create(concept);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ConceptResponse update(@PathVariable Long id, @Valid @RequestBody ConceptRequest concept) {
        return conceptService.update(concept, id);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        conceptService.delete(id);
    }

}