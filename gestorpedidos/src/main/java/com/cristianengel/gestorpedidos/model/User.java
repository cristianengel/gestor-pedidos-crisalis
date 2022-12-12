package com.cristianengel.gestorpedidos.model;

import com.cristianengel.gestorpedidos.model.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "usuarios")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "nombre")
    private String name;
    @Column(name = "apellido")
    private String lastname;
    @Column(name = "nombreUsuario")
    private String username;
    @Column(name = "contraseña")
    private String password;

    public User(UserDTO userDTO) {
        this.name = userDTO.getName();
        this.lastname = userDTO.getLastname();
        this.username = userDTO.getUsername();
        this.password = userDTO.getPassword();
    }

    public UserDTO toDTO() {
        return
                UserDTO.builder()
                        .name(this.name)
                        .lastname(this.lastname)
                        .username(this.username)
                        .password(this.password)
                        .build();
    }

}
