package com.cristianengel.gestorpedidos.model;

import com.cristianengel.gestorpedidos.model.dto.UserDTO;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "usuario")
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return false;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
