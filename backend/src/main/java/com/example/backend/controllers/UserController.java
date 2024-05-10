package com.example.backend.controllers;

import com.example.backend.configs.AppConstants;
import com.example.backend.dto.PasswordRequest;
import com.example.backend.dto.UserRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("/")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponse> indexUsers() {
        return userService.index();
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    @ResponseStatus(HttpStatus.FOUND)
    public UserResponse showUser(@RequestBody Long id) {
        return userService.show(id);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(@RequestBody @Valid UserRequest user){
        return this.userService.create(user);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserResponse updateUser(@PathVariable Long id, @RequestBody @Valid UserRequest user) {
        return this.userService.update(user, id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize(AppConstants.ADMIN_AUTHORITY)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        this.userService.delete(id);
    }

    @PutMapping("/password/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public UserResponse modifyPassword(@PathVariable Long id, @Valid @RequestBody PasswordRequest request){
        return  userService.modifyPassword(id, request);
    }
}
