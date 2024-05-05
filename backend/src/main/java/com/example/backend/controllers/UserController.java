package com.example.backend.controllers;

import com.example.backend.dto.UserRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.models.User;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponse> indexUsers() {
        return userService.index();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/")
    public void createUser(@RequestBody @Valid UserRequest user){
        this.userService.create(user);
    }
}
