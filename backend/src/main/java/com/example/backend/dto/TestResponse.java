package com.example.backend.dto;

import com.example.backend.models.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestResponse {
    private String titre;

    private List<Question> questions;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
