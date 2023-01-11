package com.cristianengel.gestorpedidos.model.dto;

import com.cristianengel.gestorpedidos.model.Tax;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AssetDTO {
    private int id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("price")
    private double price;
    @JsonProperty("type")
    private int type;
    @JsonProperty("extra_charges")
    private double extraCharges;
    @JsonProperty("taxes")
    private List<Tax> taxes;
}
