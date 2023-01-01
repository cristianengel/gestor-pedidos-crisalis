package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.exception.custom.UnauthorizedException;
import com.cristianengel.gestorpedidos.model.Tax;
import com.cristianengel.gestorpedidos.model.dto.TaxDTO;
import com.cristianengel.gestorpedidos.repository.TaxRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaxService {

    private final TaxRepository taxRepository;

    public TaxService(TaxRepository taxRepository) {
        this.taxRepository = taxRepository;
    }

    public Tax saveTax(TaxDTO taxDTO) {
        return this.taxRepository.save(new Tax(taxDTO));
    }

    public void deleteTaxById(int id) {
        this.taxRepository.deleteById(id);
    }

    public TaxDTO loadTaxByName(String name) {
        return this.taxRepository.findByName(name)
                .orElseThrow(
                        () -> new UnauthorizedException("Non Existing Tax.")
                ).toDTO();
    }

    public List<Tax> searchTax(String name) {
        return this.taxRepository.searchTax(name);
    }

    public void updateTax(int id, String name, double percentage) {
        this.taxRepository.updateNameAndPercentageById(name, percentage, id);
    }

    public List<TaxDTO> getAllTaxesInDB() {
        return this.taxRepository
                .findAll()
                .stream()
                .map(Tax::toDTO)
                .collect(Collectors.toList());
    }
}
