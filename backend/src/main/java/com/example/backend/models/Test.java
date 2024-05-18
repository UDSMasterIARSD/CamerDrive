package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Data
@Table
@Entity(name = "tests")
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "test_question",
            joinColumns = @JoinColumn(name = "test_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id"))
    private List<Question> questions;

    @OneToMany(mappedBy = "test", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ScoreUserTest> scoreUserTests;
}
