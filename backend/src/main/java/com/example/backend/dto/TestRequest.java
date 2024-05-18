package com.example.backend.dto;

import com.example.backend.models.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestRequest {
    private String title;

    private List<Question> questions;
}
