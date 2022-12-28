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

    public void deleteGoodById(int id) {
        this.goodRepository.deleteById(id);
    }

    public GoodDTO loadGoodById(int id) {
        return this.goodRepository.findById(id)
                .orElseThrow(
                        () -> new UnauthorizedException("Non Existing Good.")
                ).toDTO();
    }

    public void updateProduct(int id, String name, double price) {
        this.goodRepository.updateNameAndPriceById(name, price, id);
    }

    public List<Good> searchProduct(String name) {
        return this.goodRepository.searchProduct(name);
    }

    public List<GoodDTO> getAllGoodsInDB() {
        return this.goodRepository
                .findAll()
                .stream()
                .map(Good::toDTO)
                .collect(Collectors.toList());
    }
}
