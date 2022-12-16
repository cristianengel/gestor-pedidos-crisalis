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
public class BienDTO {
    @JsonProperty("precio")
    private double precio;
    @JsonProperty("tipo")
    private int tipo;
    @JsonProperty("cargo_soporte")
    private double cargoSoporte;
}
