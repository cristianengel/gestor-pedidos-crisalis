package com.cristianengel.gestorpedidos.model;


import com.cristianengel.gestorpedidos.model.dto.AssetDTO;
import lombok.*;
import org.hibernate.Hibernate;
import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "bien")
public class Asset {

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

    @ManyToMany(
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL
    )
    private List<Tax> taxes;

    public Asset(AssetDTO assetDTO) {
        this.name = assetDTO.getName();
        this.price = assetDTO.getPrice();
        this.type = assetDTO.getType();
        this.extraCharges = assetDTO.getExtraCharges();
        this.taxes = assetDTO.getTaxes();
    }

    public AssetDTO toDTO() {
        return
                AssetDTO.builder()
                        .id(this.id)
                        .name(this.name)
                        .price(this.price)
                        .type(this.type)
                        .extraCharges(this.extraCharges)
                        .taxes(this.taxes)
                        .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Asset asset = (Asset) o;
        return false;
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
