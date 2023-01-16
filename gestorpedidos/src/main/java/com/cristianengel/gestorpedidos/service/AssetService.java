package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.exception.custom.UnauthorizedException;
import com.cristianengel.gestorpedidos.model.Asset;
import com.cristianengel.gestorpedidos.model.Tax;
import com.cristianengel.gestorpedidos.model.dto.AssetDTO;
import com.cristianengel.gestorpedidos.repository.AssetRepository;
import com.cristianengel.gestorpedidos.repository.TaxRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AssetService {
    private final AssetRepository assetRepository;
    private final TaxRepository taxRepository;

    public AssetService(AssetRepository assetRepository, TaxRepository taxRepository) {
        this.assetRepository = assetRepository;
        this.taxRepository = taxRepository;
    }

    public Asset saveGood(AssetDTO assetDTO, List<Integer> taxesId) {
        for (Integer integer : taxesId) {
            assetDTO.getTaxes().add(this.taxRepository.findById(integer).orElseThrow(
                    () -> {
                        throw new RuntimeException("Tax not found");
                    }
            ));
        }
        return this.assetRepository.save(new Asset(assetDTO));
    }

    public void deleteProductById(int id) {
        this.assetRepository.deleteByIdAndType(id, 1);
    }

    public void deleteServiceById(int id) {
        this.assetRepository.deleteByIdAndType(id, 2);
    }

    public AssetDTO findById(int id) {
        return this.assetRepository.findById(id)
                .orElseThrow(
                        () -> new UnauthorizedException("Non Existing Asset.")
                ).toDTO();
    }

    public void updateProduct(int id, String name, Double price, List<Integer> taxesId) {
        List<Tax> taxes = new ArrayList<>();
        for(int i = 0; i < taxesId.size(); i++) {
            taxes.add(this.taxRepository.findById(taxesId.get(i)).orElseThrow(
                    () -> {
                        throw new RuntimeException("No se encontró el impuesto");
                    }
            ));
        }
        Asset product = this.assetRepository.findById(id).orElseThrow(() -> new RuntimeException("No se encontró el impuesto"));
        product.setName(name);
        product.setPrice(price);
        product.setTaxes(taxes);
        this.assetRepository.save(product);
    }

    public void updateService(int id, String name, Double price, Double extraCharges, List<Integer> taxesId) {
        List<Tax> taxes = new ArrayList<>();
        for(int i = 0; i < taxesId.size(); i++) {
            taxes.add(this.taxRepository.findById(taxesId.get(i)).orElseThrow(
                    () -> {
                        throw new RuntimeException("No se encontró el impuesto");
                    }
            ));
        }
        Asset service = this.assetRepository.findById(id).orElseThrow(() -> new RuntimeException("No se encontró el impuesto"));
        service.setName(name);
        service.setPrice(price);
        service.setExtraCharges(extraCharges);
        service.setTaxes(taxes);
        this.assetRepository.save(service);
    }

    public List<Asset> findAllGoodsByNameAndType(String name, int type) {
        return this.assetRepository.findAllByNameAndType(name, type);
    }
    public List<AssetDTO> getAllProductsInDB() {
        return this.assetRepository.findAllByType(1)
                .stream()
                .map(Asset::toDTO)
                .collect(Collectors.toList());
    }

    public List<AssetDTO> getAllServicesInDB() {
        return this.assetRepository.findAllByType(2)
                .stream()
                .map(Asset::toDTO)
                .collect(Collectors.toList());
    }

    public List<AssetDTO> getAllGoodsInDB() {
        return this.assetRepository
                .findAll()
                .stream()
                .map(Asset::toDTO)
                .collect(Collectors.toList());
    }
}
