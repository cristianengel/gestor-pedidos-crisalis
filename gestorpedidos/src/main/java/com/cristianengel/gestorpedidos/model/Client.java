package com.cristianengel.gestorpedidos.model;

import com.cristianengel.gestorpedidos.model.dto.ClientDTO;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cliente")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "esEmpresa")
    private boolean isBusiness;

    @Column(name = "identificacion")
    private String identificationNumber;

    @Column(name = "nombre")
    private String name;

    @Column(name = "apellido")
    private String lastname;

    @Column(name = "direccion")
    private String address;

    @Column(name = "telefono")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "razonSocial")
    private String businessName;

    @Column(name = "fechaInicio")
    private LocalDate businessStartDate;

    public Client(ClientDTO clientDTO) {
        this.isBusiness = clientDTO.isBusiness();
        this.identificationNumber = clientDTO.getIdentificationNumber();
        this.name = clientDTO.getName();
        this.lastname = clientDTO.getLastname();
        this.address = clientDTO.getAddress();
        this.phoneNumber = clientDTO.getPhoneNumber();
        this.email = clientDTO.getEmail();
        this.businessName = clientDTO.getBusinessName();
        this.businessStartDate = clientDTO.getBusinessStartDate();
    }

    public ClientDTO toDTO() {
        return ClientDTO.builder()
                .isBusiness(this.isBusiness)
                .identificationNumber(this.identificationNumber)
                .name(this.name)
                .lastname(this.lastname)
                .address(this.address)
                .phoneNumber(this.phoneNumber)
                .email(this.email)
                .businessName(this.businessName)
                .businessStartDate(this.businessStartDate)
                .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Client client = (Client) o;
        return id == client.id && isBusiness == client.isBusiness && Objects.equals(identificationNumber, client.identificationNumber) && Objects.equals(name, client.name) && Objects.equals(lastname, client.lastname) && Objects.equals(address, client.address) && Objects.equals(phoneNumber, client.phoneNumber) && Objects.equals(email, client.email) && Objects.equals(businessName, client.businessName) && Objects.equals(businessStartDate, client.businessStartDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, isBusiness, identificationNumber, name, lastname, address, phoneNumber, email, businessName, businessStartDate);
    }
}
