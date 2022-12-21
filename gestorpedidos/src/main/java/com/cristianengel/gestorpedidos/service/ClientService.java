package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.exception.custom.UnauthorizedException;
import com.cristianengel.gestorpedidos.model.Client;
import com.cristianengel.gestorpedidos.model.dto.ClientDTO;
import com.cristianengel.gestorpedidos.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public Client saveClient(ClientDTO clientDTO) {
        return this.clientRepository.save(new Client(clientDTO));
    }

    public void deleteClientById(int id) {
        this.clientRepository.deleteById(id);
    }

    public ClientDTO loadClientByIdentification(String identification) {
        return this.clientRepository.findByIdentification(identification)
                .orElseThrow(
                        () -> new UnauthorizedException("Client doesn't exist")
                ).toDTO();
    }

    public List<ClientDTO> getAllClientsInDB() {
        return this.clientRepository
                .findAll()
                .stream()
                .map(Client::toDTO)
                .collect(Collectors.toList());
    }
}
