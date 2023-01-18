package com.cristianengel.gestorpedidos.model.dto;

import com.cristianengel.gestorpedidos.model.Asset;
import com.cristianengel.gestorpedidos.model.Order;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailDTO {
    // id asset pricesell quantity order
    private int id;

    @JsonProperty("asset")
    private Asset asset = null;

    @JsonProperty("priceSell")
    private double priceSell;

    @JsonProperty("quantity")
    private int quantity;

    @JsonProperty("order")
    private Order order = null;
}
