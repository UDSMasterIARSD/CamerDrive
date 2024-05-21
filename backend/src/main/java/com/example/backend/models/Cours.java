package com.example.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.sql.Timestamp;
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
    @Column(nullable = false, unique = true)
    private String titre;

    @NotNull(message = "description : Ce champ est obligatoire")
    @NotBlank(message = "description : Ce champ ne doit pas etre vide")
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Timestamp updatedAt;

    @ManyToMany(mappedBy = "cours")
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "cours", cascade = CascadeType.ALL)
    private List<Concept> concepts;

    @OneToMany(mappedBy = "cours", cascade = CascadeType.ALL)
    private List<Quiz> quizzes;
}
