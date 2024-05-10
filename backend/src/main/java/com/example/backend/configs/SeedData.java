package com.example.backend.configs;

import com.example.backend.models.Role;
import com.example.backend.models.User;
import com.example.backend.repositories.RoleRepository;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Configuration
public class SeedData implements CommandLineRunner {
    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepo.count() == 0) {
            Role role1 = new Role();
            role1.setNom("ADMIN");
            role1.setDescription("Administrateur");
            roleRepo.save(role1);
            Role role2 = new Role();
            role2.setNom("USER");
            role2.setDescription("Utilisateur");
            roleRepo.save(role2);
        }
        if (userRepo.count() == 0) {
            User user = new User();
            user.setUsername("admin");
            user.setEmail("admin@admin.com");
            user.setPassword(encoder.encode("P@ssword1"));
            Role role = new Role();
            role.setNom("ADMIN");
            user.setRole(roleRepo.findByNom("ADMIN"));
            userRepo.save(user);
        }
    }
}
