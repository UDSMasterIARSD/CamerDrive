package com.example.backend.controllers;

import com.example.backend.configs.AppConstants;
import com.example.backend.dto.FichierResponse;
import com.example.backend.services.FichierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/files")
public class FichierController {

    @Autowired
    private FichierService fichierService;

    @PostMapping(value = "/", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    public FichierResponse upload(@RequestBody MultipartFile file) {
        return fichierService.upload(file, AppConstants.PROFILE_PATH);
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> download(@PathVariable Long id) {
        return fichierService.download(id);
    }
}
