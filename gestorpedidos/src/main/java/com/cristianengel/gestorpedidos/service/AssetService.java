package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.exception.custom.UnauthorizedException;
import com.cristianengel.gestorpedidos.model.Asset;
import com.cristianengel.gestorpedidos.model.dto.AssetDTO;
import com.cristianengel.gestorpedidos.repository.AssetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetService {
    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public Asset saveGood(AssetDTO assetDTO) {
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

    public void updateProduct(int id, String name, Double price) {
        this.assetRepository.updateProductNameAndPriceById(name, price, id);
    }

    public void updateService(int id, String name, Double price, Double extraCharges) {
        this.assetRepository.updateNameAndPriceAndExtraChargesById(name, price, extraCharges, id);
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
