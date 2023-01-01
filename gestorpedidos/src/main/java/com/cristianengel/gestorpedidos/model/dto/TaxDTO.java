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
public class TaxDTO {
    private int id;
    @JsonProperty("name")
    private String name;
    @JsonProperty("percentage")
    private double percentage;
}
