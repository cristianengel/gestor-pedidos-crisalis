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

    @ManyToOne(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    @JoinColumn(name = "order_id")
    @ToString.Exclude
    private Order order;

    public OrderDetail(OrderDetailDTO orderDetailDTO) {
        this.asset = orderDetailDTO.getAsset();
        this.priceSell = orderDetailDTO.getPriceSell();
        this.quantity = orderDetailDTO.getQuantity();
        this.order = orderDetailDTO.getOrder();
    }

    public OrderDetailDTO toDTO() {
        return OrderDetailDTO.builder()
                .id(this.id)
                .asset(this.asset)
                .priceSell(this.priceSell)
                .quantity(this.quantity)
                .order(this.order)
                .build();
    }
}
