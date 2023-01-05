package com.cristianengel.gestorpedidos.model.dto;

import com.cristianengel.gestorpedidos.model.Client;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDTO {
    @JsonProperty("client")
    private Client clientId;

    @JsonProperty("date")
    private LocalDate date;

    @JsonProperty("voucher")
    private String voucher;

    @JsonProperty("total")
    private double total;
}
