package com.example.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "cours")
@RequiredArgsConstructor
public class Cours implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "titre : Ce champ est obligatoire")
    @NotBlank(message = "titre : Ce champ ne doit pas etre vide")
    private String titre;

    @NotNull(message = "description : Ce champ est obligatoire")
    @NotBlank(message = "description : Ce champ ne doit pas etre vide")
    private String description;

    @ManyToMany(mappedBy = "courses")
    private List<User> users = new ArrayList<>();
}
