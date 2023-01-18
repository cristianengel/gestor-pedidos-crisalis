package com.cristianengel.gestorpedidos.model;

import com.cristianengel.gestorpedidos.model.dto.OrderDetailDTO;
import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pedido_detalle")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(name = "asset_id")
    private Asset asset;

    @Column(name = "precio")
    private double priceSell;

    @Column(name = "cantidad")
    private int quantity;
    public OrderDetail(OrderDetailDTO orderDetailDTO) {
        this.asset = orderDetailDTO.getAsset();
        this.priceSell = orderDetailDTO.getPriceSell();
        this.quantity = orderDetailDTO.getQuantity();
    }

    public OrderDetailDTO toDTO() {
        return OrderDetailDTO.builder()
                .id(this.id)
                .asset(this.asset)
                .priceSell(this.priceSell)
                .quantity(this.quantity)
                .build();
    }
}
