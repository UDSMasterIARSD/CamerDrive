package com.example.backend.services;

import com.example.backend.dto.RoleRequest;
import com.example.backend.dto.RoleResponse;
import com.example.backend.models.Role;
import com.example.backend.repositories.RoleRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepo;

    @Autowired
    private final ModelMapper modelMapper;


    @Override
    public List<RoleResponse> index() {
        return roleRepo.findAll()
                .stream().map(el->modelMapper.map(el, RoleResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public RoleResponse show(Long id) {
//        Role role = roleRepo.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Le Role", "d'Id", id));
        Role role = roleRepo.findById(id).orElseThrow(() -> new RuntimeException("Le role n'a pas ete trouve !!!"));
        return modelMapper.map(role, RoleResponse.class);
    }

    @Override
    public RoleResponse create(RoleRequest role) {
        Role newRole = modelMapper.map(role, Role.class);
        return modelMapper.map(roleRepo.save(newRole), RoleResponse.class);
    }

    @Override
    public RoleResponse update(RoleRequest role, Long id) {
//        roleRepo.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Le Role que vous voulez modifier", "d'Id", id));
        roleRepo.findById(id).orElseThrow(() -> new RuntimeException("Le role n'a pas ete trouve !!!"));
                Role oldRole = modelMapper.map(role, Role.class);
        oldRole.setId(id);
        return modelMapper.map(roleRepo.save(oldRole), RoleResponse.class);
    }

    @Override
    public void delete(Long id) {
//        Role role = roleRepo.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Le Role que voulez supprimer ", "d'Id", id));
        Role role = roleRepo.findById(id).orElseThrow(() -> new RuntimeException("Le role n'a pas ete trouve !!!"));
        roleRepo.delete(role);
    }

}
