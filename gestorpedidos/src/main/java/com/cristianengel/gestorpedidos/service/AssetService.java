package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.exception.custom.UnauthorizedException;
import com.cristianengel.gestorpedidos.model.Asset;
import com.cristianengel.gestorpedidos.model.dto.AssetDTO;
import com.cristianengel.gestorpedidos.repository.GoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetService {
    private final GoodRepository goodRepository;

    public AssetService(GoodRepository goodRepository) {
        this.goodRepository = goodRepository;
    }

    public Asset saveGood(AssetDTO assetDTO) {
        return this.goodRepository.save(new Asset(assetDTO));
    }

    public void deleteProductById(int id) {
        this.goodRepository.deleteByIdAndType(id, 1);
    }

    public void deleteServiceById(int id) {
        this.goodRepository.deleteByIdAndType(id, 2);
    }

    public AssetDTO findById(int id) {
        return this.goodRepository.findById(id)
                .orElseThrow(
                        () -> new UnauthorizedException("Non Existing Asset.")
                ).toDTO();
    }

    public void updateProduct(int id, String name, Double price) {
        this.goodRepository.updateProductNameAndPriceById(name, price, id);
    }

    public void updateService(int id, String name, Double price, Double extraCharges) {
        this.goodRepository.updateNameAndPriceAndExtraChargesById(name, price, extraCharges, id);
    }

    public List<Asset> findAllGoodsByNameAndType(String name, int type) {
        return this.goodRepository.findAllByNameAndType(name, type);
    }
    public List<AssetDTO> getAllProductsInDB() {
        return this.goodRepository.findAllByType(1)
                .stream()
                .map(Asset::toDTO)
                .collect(Collectors.toList());
    }

    public List<AssetDTO> getAllServicesInDB() {
        return this.goodRepository.findAllByType(2)
                .stream()
                .map(Asset::toDTO)
                .collect(Collectors.toList());
    }

    public List<AssetDTO> getAllGoodsInDB() {
        return this.goodRepository
                .findAll()
                .stream()
                .map(Asset::toDTO)
                .collect(Collectors.toList());
    }
}
