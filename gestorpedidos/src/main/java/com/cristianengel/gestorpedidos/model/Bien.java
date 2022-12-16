package com.cristianengel.gestorpedidos.model;


import com.cristianengel.gestorpedidos.model.dto.BienDTO;
import lombok.*;
import org.hibernate.Hibernate;
import javax.persistence.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bien")
public class Bien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "precio")
    private double precio;

    @Column(name = "tipo")
    private int tipo;

    @Column(name = "cargo_soporte")
    private double cargoSoporte;

    public Bien(BienDTO bienDTO) {
        this.precio = bienDTO.getPrecio();
        this.tipo = bienDTO.getTipo();
        this.cargoSoporte = bienDTO.getCargoSoporte();
    }

    public BienDTO toDTO() {
        return
                BienDTO.builder()
                        .precio(this.precio)
                        .tipo(this.tipo)
                        .cargoSoporte(this.cargoSoporte)
                        .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Bien bien = (Bien) o;
        return false;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
