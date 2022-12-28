package com.cristianengel.gestorpedidos.controller;

import com.cristianengel.gestorpedidos.model.Client;
import com.cristianengel.gestorpedidos.model.dto.ClientDTO;
import com.cristianengel.gestorpedidos.service.ClientService;
import org.springframework.boot.autoconfigure.quartz.QuartzTransactionManager;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping(value = "new", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Client saveClient(@RequestBody ClientDTO clientDTO) {
        return this.clientService.saveClient(clientDTO);
    }

    @GetMapping(value = "get_by_identification", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ClientDTO> searchClient(@RequestParam String identification) {
        return this.clientService.searchClient(identification);
    }

    @PostMapping(value = "delete")
    public void deleteByIdentification(@RequestParam String identification) {
        this.clientService.deleteByIdentification(identification);
    }

    @GetMapping(value = "get_client_data")
    public List<Object> getClientData(@RequestParam String identification) {
        return this.clientService.getClientData(identification);
    }

    @PostMapping(value = "update")
    public void updateClient(@RequestParam boolean isBusiness, String identification,
                             String name, String lastname, String address,
                             String phoneNumber, String email,
                             String businessName,
                             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate businessStartDate) {
        this.clientService.updateClient(isBusiness, identification, name, lastname,
                address, phoneNumber, email, businessName, businessStartDate);
    }

    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ClientDTO> getAllClients() {
        return this.clientService.getAllClientsInDB();
    }
}
