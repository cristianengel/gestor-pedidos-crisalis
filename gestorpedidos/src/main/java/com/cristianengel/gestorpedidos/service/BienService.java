package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.exception.custom.UnauthorizedException;
import com.cristianengel.gestorpedidos.model.Bien;
import com.cristianengel.gestorpedidos.model.dto.BienDTO;
import com.cristianengel.gestorpedidos.repository.BienRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BienService {
    private final BienRepository bienRepository;

    public BienService(BienRepository bienRepository) {
        this.bienRepository = bienRepository;
    }

    public Bien saveBien(BienDTO bienDTO) {
        return this.bienRepository.save(new Bien(bienDTO));
    }

    public BienDTO loadBien(int id) {
        return this.bienRepository.findById(id)
                .orElseThrow(
                        () -> new UnauthorizedException("Bien no existente.")
                ).toDTO();
    }

    public List<BienDTO> getAllBienesInDB() {
        return this.bienRepository
                .findAll()
                .stream()
                .map(Bien::toDTO)
                .collect(Collectors.toList());
    }
}
