package com.example.backend.services;

import com.example.backend.dto.PasswordRequest;
import com.example.backend.dto.UserRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.UserDetailsImpl;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;

    @Autowired
    private final ModelMapper mapper;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserResponse> index() {
        return userRepo.findAll().stream().map(el -> mapper.map(el, UserResponse.class)).toList();
    }

    @Override
    public UserResponse show(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("Utilisateur pas trouve !!!"));
        return mapper.map(user, UserResponse.class);
    }

    @Override
    public UserResponse create(UserRequest user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = mapper.map(user, User.class);
        System.out.println(newUser);

        return mapper.map(userRepo.save(newUser), UserResponse.class);
    }

    @Override
    public UserResponse update(UserRequest user, Long id) {
        userRepo.findById(id).orElseThrow(() -> new RuntimeException("Utilisateur pas trouve !!!"));
        User oldUser = mapper.map(user, User.class);
        oldUser.setId(id);
        return mapper.map(userRepo.save(oldUser), UserResponse.class);
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public UserResponse modifyPassword(Long id, PasswordRequest request) {
        return null;
    }

}
