package com.cristianengel.gestorpedidos.controller;

import com.cristianengel.gestorpedidos.model.Client;
import com.cristianengel.gestorpedidos.model.dto.ClientDTO;
import com.cristianengel.gestorpedidos.service.ClientService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public List<Client> searchClient(@RequestParam String identification) {
        return this.clientService.searchClient(identification);
    }

    @PostMapping(value = "delete")
    public void deleteByIdentification(@RequestParam String identification) {
        this.clientService.deleteByIdentification(identification);
    }

    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ClientDTO> getAllClients() {
        return this.clientService.getAllClientsInDB();
    }
}
