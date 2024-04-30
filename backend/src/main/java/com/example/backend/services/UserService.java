package com.example.backend.services;

import com.example.backend.models.User;
import org.springframework.stereotype.Service;


public interface UserService {
    void register(User user);
}
