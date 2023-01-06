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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    private Client client;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "asset_id", referencedColumnName = "id")
    private List<Asset> assets;

    @Column(name = "fecha")
    private LocalDate date;

    @Column(name = "comprobante")
    private String voucher;

    @Column(name = "importe_total")
    private double total;

    public Order(OrderDTO orderDTO) {
        this.client = orderDTO.getClientId();
        this.assets = orderDTO.getAssets();
        this.date = orderDTO.getDate();
        this.voucher = orderDTO.getVoucher();
        this.total = orderDTO.getTotal();
    }

    public OrderDTO toDTO() {
        return OrderDTO.builder()
                .clientId(this.client)
                .assets(this.assets)
                .date(this.date)
                .voucher(this.voucher)
                .total(this.total)
                .build();
    }
}
