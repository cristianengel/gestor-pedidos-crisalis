package com.cristianengel.gestorpedidos.model;


import com.cristianengel.gestorpedidos.model.dto.GoodDTO;
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
public class Good {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "nombre")
    private String name;

    @Column(name = "precio_base")
    private double price;

    @Column(name = "tipo")
    // Type 1: Product
    // Type 2: Service
    private int type;

    @Column(name = "cargo_soporte")
    // Only with type = 3
    private double extraCharges;

    public Good(GoodDTO goodDTO) {
        this.name = goodDTO.getName();
        this.price = goodDTO.getPrice();
        this.type = goodDTO.getType();
        this.extraCharges = goodDTO.getExtraCharges();
    }

    public GoodDTO toDTO() {
        return
                GoodDTO.builder()
                        .id(this.id)
                        .name(this.name)
                        .price(this.price)
                        .type(this.type)
                        .extraCharges(this.extraCharges)
                        .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Good good = (Good) o;
        return false;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
