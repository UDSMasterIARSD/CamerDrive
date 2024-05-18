package com.example.backend.controllers;

import java.util.List;

import com.example.backend.dto.ConceptRequest;
import com.example.backend.dto.ConceptResponse;
import com.example.backend.services.ConceptService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/concepts")
public class ConceptController {

    @Autowired
    private final ConceptService conceptService;


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