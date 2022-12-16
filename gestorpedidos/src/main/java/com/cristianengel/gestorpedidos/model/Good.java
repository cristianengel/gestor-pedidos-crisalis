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
@Table(name = "good")
public class Good {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private double price;

    @Column(name = "type")
    private int type;

    @Column(name = "extra_charges")
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
