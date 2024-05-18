package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionRequest {
    private String libelle;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctOption;
}
