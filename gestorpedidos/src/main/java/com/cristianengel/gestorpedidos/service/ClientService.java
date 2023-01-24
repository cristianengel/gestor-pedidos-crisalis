package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.model.Client;
import com.cristianengel.gestorpedidos.model.dto.ClientDTO;
import com.cristianengel.gestorpedidos.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
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

    public void deleteByIdentification(String identification) {
        this.clientRepository.deleteByIdentification(identification);
    }

    public List<ClientDTO> searchClient(String identification) {
        return this.clientRepository.findByIdentification(identification)
                .stream()
                .map(Client::toDTO)
                .collect(Collectors.toList());
    }

    public List<ClientDTO> searchClientByDate(LocalDate date) {
        List<Client> clientList = this.clientRepository.findByDate(date);
        List<ClientDTO> clientDTOList = new ArrayList<ClientDTO>();
        for(Client iterator : clientList) {
            clientDTOList.add(iterator.toDTO());
        }
        return clientDTOList;
    }

    public void updateClient(boolean isBusiness, String identification,
                             String name, String lastname, String address,
                             String phoneNumber, String email,
                             String businessName, LocalDate businessStartDate, String ownerId) {
        this.clientRepository.updateClientAttributes(isBusiness, name, lastname, address,
                phoneNumber, email, businessName, businessStartDate, ownerId, identification);
    }

    public List<Object> getClientData(String identification) {
        Client client = this.clientRepository.findByIdentification(identification).get(0);
        return new ArrayList<Object>(Arrays.asList(client.isBusiness(), client.getName(), client.getLastname(), client.getAddress(), client.getPhoneNumber(), client.getEmail(), client.getBusinessName(), client.getBusinessStartDate(), client.getOwnerId()));
    }

    public List<ClientDTO> getAllClientsInDB() {
        return this.clientRepository
                .findAll()
                .stream()
                .map(Client::toDTO)
                .collect(Collectors.toList());
    }
}
