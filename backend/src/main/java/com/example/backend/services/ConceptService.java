package com.example.backend.services;

import com.example.backend.dto.ConceptRequest;
import com.example.backend.dto.ConceptResponse;

import java.util.List;

public interface ConceptService {

    public List<ConceptResponse> index();

    public ConceptResponse show(Long id);

    public ConceptResponse create(ConceptRequest concept);

    public ConceptResponse update(ConceptRequest concept, Long id);

    public void delete(Long id);
}
