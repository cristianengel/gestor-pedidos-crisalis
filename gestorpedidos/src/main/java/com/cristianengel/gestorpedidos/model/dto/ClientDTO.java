package com.cristianengel.gestorpedidos.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ClientDTO {
    @JsonProperty("is_business")
    private boolean isBusiness;

    @JsonProperty("identification_number")
    private String identificationNumber;

    @JsonProperty("name")
    private String name;

    @JsonProperty("lastname")
    private String lastname;

    @JsonProperty("address")
    private String address;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("email")
    private String email;

    @JsonProperty("business_name")
    private String businessName;

    @JsonProperty("business_start_date")
    private LocalDate businessStartDate;
}
