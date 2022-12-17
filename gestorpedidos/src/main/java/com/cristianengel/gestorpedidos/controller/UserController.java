package com.cristianengel.gestorpedidos.controller;

import com.cristianengel.gestorpedidos.model.User;
import com.cristianengel.gestorpedidos.model.dto.UserDTO;
import com.cristianengel.gestorpedidos.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "registration", consumes = MediaType.APPLICATION_JSON_VALUE)
    public User saveUser(@RequestBody UserDTO userDTO) {
        return this.userService.saveUser(userDTO);
    }

    @PostMapping(value = "delete")
    public void deleteUserByUsername(@RequestParam String username) {this.userService.deleteUser(username);}

    @GetMapping(value = "login", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDTO loginUser(@RequestParam String username, String password) {
        return this.userService.loginUser(username, password);
    }

    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<UserDTO> getAllUsers() {
        return this.userService.getListAllUsersInDB();
    }

}
