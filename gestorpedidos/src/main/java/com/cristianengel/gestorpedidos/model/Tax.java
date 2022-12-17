package com.cristianengel.gestorpedidos.model;

import com.cristianengel.gestorpedidos.model.dto.TaxDTO;
import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "impuesto")
public class Tax {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "nombre")
    private String name;

    @Column(name = "porcentaje")
    private double percentage;

    public Tax(TaxDTO taxDTO) {
        this.name = taxDTO.getName();
        this.percentage = taxDTO.getPercentage();
    }

    public TaxDTO toDTO() {
        return TaxDTO.builder()
                .name(this.name)
                .percentage(this.percentage)
                .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tax tax = (Tax) o;
        return id == tax.id && Double.compare(tax.percentage, percentage) == 0 && Objects.equals(name, tax.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, percentage);
    }
}
