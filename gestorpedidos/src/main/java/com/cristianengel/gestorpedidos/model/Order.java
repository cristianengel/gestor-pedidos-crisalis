package com.cristianengel.gestorpedidos.model;

import com.cristianengel.gestorpedidos.model.dto.OrderDTO;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pedido")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @JoinColumn(name = "client_id")
    private Client client;

    @Column(name = "fecha")
    private LocalDate date;

    @Column(name = "importe_total")
    private double total;

    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    List<OrderDetail> orderDetails;

    public Order(OrderDTO orderDTO) {
        this.client = orderDTO.getClient();
        this.date = orderDTO.getDate();
        this.total = orderDTO.getTotal();
        this.orderDetails = orderDTO.getOrderDetails();
    }

    public OrderDTO toDTO() {
        return OrderDTO.builder()
                .id(this.id)
                .client(this.client)
                .date(this.date)
                .total(this.total)
                .orderDetails(this.orderDetails)
                .build();
    }
}
