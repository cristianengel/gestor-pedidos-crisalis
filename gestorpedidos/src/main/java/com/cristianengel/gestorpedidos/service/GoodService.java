package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.exception.custom.UnauthorizedException;
import com.cristianengel.gestorpedidos.model.Good;
import com.cristianengel.gestorpedidos.model.dto.GoodDTO;
import com.cristianengel.gestorpedidos.repository.GoodRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoodService {
    private final GoodRepository goodRepository;

    public GoodService(GoodRepository goodRepository) {
        this.goodRepository = goodRepository;
    }

    public Good saveGood(GoodDTO goodDTO) {
        return this.goodRepository.save(new Good(goodDTO));
    }

    public void deleteProductById(int id) {
        this.goodRepository.deleteByIdAndType(id, 1);
    }

    public void deleteServiceById(int id) {
        this.goodRepository.deleteByIdAndType(id, 2);
    }

    public GoodDTO findById(int id) {
        return this.goodRepository.findById(id)
                .orElseThrow(
                        () -> new UnauthorizedException("Non Existing Good.")
                ).toDTO();
    }

    public void updateProduct(int id, String name, Double price) {
        this.goodRepository.updateProductNameAndPriceById(name, price, id);
    }

    public void updateService(int id, String name, Double price, Double extraCharges) {
        this.goodRepository.updateNameAndPriceAndExtraChargesById(name, price, extraCharges, id);
    }

    public List<Good> findAllGoodsByNameAndType(String name, int type) {
        return this.goodRepository.findAllByNameAndType(name, type);
    }
    public List<GoodDTO> getAllProductsInDB() {
        return this.goodRepository.findAllByType(1)
                .stream()
                .map(Good::toDTO)
                .collect(Collectors.toList());
    }

    public List<GoodDTO> getAllServicesInDB() {
        return this.goodRepository.findAllByType(2)
                .stream()
                .map(Good::toDTO)
                .collect(Collectors.toList());
    }

    public List<GoodDTO> getAllGoodsInDB() {
        return this.goodRepository
                .findAll()
                .stream()
                .map(Good::toDTO)
                .collect(Collectors.toList());
    }
}
