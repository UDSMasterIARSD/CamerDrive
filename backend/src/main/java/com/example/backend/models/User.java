package com.example.backend.models;

import jakarta.persistence.*;
import lombok.*;

//@Getter
//@Setter
@Entity
//@NoArgsConstructor
//@AllArgsConstructor
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private String email;
    private String password;
}
