package com.cristianengel.gestorpedidos.model;

import com.cristianengel.gestorpedidos.model.dto.OrderDTO;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

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
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL
    )
    Set<OrderDetail> orderDetails = new HashSet<>();

    public Order(OrderDTO orderDTO) {
        this.client = orderDTO.getClient();
        this.date = orderDTO.getDate();
        this.total = orderDTO.getTotal();
    }

    public OrderDTO toDTO() {
        return OrderDTO.builder()
                .client(this.client)
                .date(this.date)
                .total(this.total)
                .build();
    }
}
