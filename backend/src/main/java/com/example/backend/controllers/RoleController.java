package com.example.backend.controllers;

import java.util.List;

import com.example.backend.dto.RoleRequest;
import com.example.backend.dto.RoleResponse;
import com.example.backend.services.RoleService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
@PreAuthorize("hasAuthority('ADMIN')")
@AllArgsConstructor
public class RoleController {

    @Autowired
    private final RoleService roleService;


    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public List<RoleResponse> indexRoles(){
        return roleService.index();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public RoleResponse showRole(@PathVariable Long id) {
        return roleService.show(id);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public RoleResponse create(@Valid @RequestBody RoleRequest role) {
        return roleService.create(role);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public RoleResponse update(@PathVariable Long id, @Valid @RequestBody RoleRequest role) {
        return roleService.update(role, id);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        roleService.delete(id);
    }

}