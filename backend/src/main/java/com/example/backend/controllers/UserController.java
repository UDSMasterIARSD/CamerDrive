package com.example.backend.controllers;

import com.example.backend.models.User;
import com.example.backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RequestMapping("/register")
@RestController
public class UserController {

    private final UserService userService;
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public void register(@RequestBody User user){
        this.userService.register(user);
    }
}
