package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.controller.UserController;
import com.cristianengel.gestorpedidos.exception.custom.EmptyElementException;
import com.cristianengel.gestorpedidos.exception.custom.NotCreatedException;
import com.cristianengel.gestorpedidos.exception.custom.UnauthorizedException;
import com.cristianengel.gestorpedidos.model.User;
import com.cristianengel.gestorpedidos.model.dto.UserDTO;
import com.cristianengel.gestorpedidos.repository.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(UserDTO userDTO) {
        if(checkUserDTO(userDTO, Boolean.FALSE)) {
            return this.userRepository.save(new User(userDTO));
        }
        throw new NotCreatedException("Error in saving new User");
    }

    public void deleteUser(String username) {
        this.userRepository.deleteByUsername(username);
    }

    public UserDTO loginUser(String username, String password) {
        if(
                this.checkUserDTO(UserDTO
                                .builder()
                                .username(username)
                                .password(password)
                                .build(), Boolean.TRUE)
        ) {
            return this.userRepository.findByUsernameAndPassword(username, password)
                    .orElseThrow(
                            () -> new UnauthorizedException("Invalid credentials")
                    ).toDTO();
        }
        throw new UnauthorizedException("Invalid credentials");
    }

    public List<UserDTO> getListAllUsersInDB() {
        return this.userRepository
                .findAll()
                .stream()
                .map(User::toDTO)
                .collect(Collectors.toList());
    }

    private Boolean checkUserDTO(UserDTO userDTO, Boolean isForLogin) {
        if(!isForLogin){
            if(StringUtils.isEmpty(userDTO.getName())){
                throw new EmptyElementException("Name is empty");
            }
            if(StringUtils.isEmpty(userDTO.getLastname())){
                throw new EmptyElementException("Lastname is empty");
            }
        }
        if(StringUtils.isEmpty(userDTO.getUsername())){
            throw new EmptyElementException("Username is empty");
        }
        if(StringUtils.isEmpty(userDTO.getPassword())){
            throw new EmptyElementException("Password is empty");
        }
        return Boolean.TRUE;
    }

}
