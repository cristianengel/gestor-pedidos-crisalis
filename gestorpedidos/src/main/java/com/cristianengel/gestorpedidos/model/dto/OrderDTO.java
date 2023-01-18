package com.cristianengel.gestorpedidos.model.dto;

import com.cristianengel.gestorpedidos.model.Client;
import com.cristianengel.gestorpedidos.model.OrderDetail;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class OrderDTO {
    @JsonProperty("client")
    private Client client = null;

    @JsonProperty("date")
    private LocalDate date;

    @JsonProperty("total")
    private double total;

    @JsonProperty("order_details")
    private List<OrderDetail> orderDetails;

    public OrderDTO() {
        orderDetails = new ArrayList<>();
    }
}
