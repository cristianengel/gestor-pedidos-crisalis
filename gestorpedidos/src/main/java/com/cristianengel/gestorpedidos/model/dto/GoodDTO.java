package com.cristianengel.gestorpedidos.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class GoodDTO {
    @JsonProperty("name")
    private String name;
    @JsonProperty("price")
    private double price;
    @JsonProperty("type")
    private int type;
    @JsonProperty("extra_charges")
    private double extraCharges;
}
