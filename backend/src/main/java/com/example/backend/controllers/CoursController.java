package com.example.backend.controllers;

import com.example.backend.dto.CoursRequest;
import com.example.backend.dto.CoursResponse;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Cours;
import com.example.backend.repositories.CoursRepository;
import com.example.backend.services.CoursService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/cours")
public class CoursController {

    @Autowired
    private CoursService coursService;


    @GetMapping("/")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public List<CoursResponse> indesCours() {
        return coursService.index();
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public CoursResponse showCours(@PathVariable Long id) {
        return coursService.show(id);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public CoursResponse createCours(@RequestBody CoursRequest cours) {
        return coursService.create(cours);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public CoursResponse updateCours(@RequestBody CoursRequest cours, @PathVariable Long id) {
        return coursService.update(cours, id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCours(@PathVariable Long id) {
        coursService.delete(id);
    }
}
