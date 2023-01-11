package com.cristianengel.gestorpedidos.controller;

import com.cristianengel.gestorpedidos.model.Asset;
import com.cristianengel.gestorpedidos.model.dto.AssetDTO;
import com.cristianengel.gestorpedidos.service.AssetService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("asset")
public class AssetController {

    private final AssetService assetService;


    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @PostMapping(value = "new", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Asset saveGood(@RequestBody AssetDTO assetDTO, @RequestParam List<Integer> taxesId) {
        return this.assetService.saveGood(assetDTO, taxesId);
    }

    @GetMapping(value = "search_product", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Asset> getAllProductsByName(@RequestParam String name) {
        return this.assetService.findAllGoodsByNameAndType(name, 1);
    }

    @GetMapping(value = "search_service", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Asset> getAllServicesByName(@RequestParam String name) {
        return this.assetService.findAllGoodsByNameAndType(name, 2);
    }

    @PostMapping(value = "delete_product")
    public void deleteProduct(@RequestParam int id) {
        this.assetService.deleteProductById(id);
    }

    @PostMapping(value = "delete_service")
    public void deleteService(@RequestParam int id) {
        this.assetService.deleteServiceById(id);
    }

    @GetMapping(value = "get_by_id", produces = MediaType.APPLICATION_JSON_VALUE)
    public AssetDTO findById(@RequestParam int id) {
        return this.assetService.findById(id);
    }

    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<AssetDTO> getAllGoods() {
        return this.assetService.getAllGoodsInDB();
    }

    @GetMapping(value = "products", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<AssetDTO> getAllProducts() {
        return this.assetService.getAllProductsInDB();
    }

    @GetMapping(value = "services", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<AssetDTO> getAllServices() {
        return this.assetService.getAllServicesInDB();
    }

    @PostMapping(value = "update_product")
    public void updateProduct(@RequestParam int id, String name, Double price){
        this.assetService.updateProduct(id, name, price);
    }

    @PostMapping(value = "update_service")
    public void updateService(@RequestParam int id, String name, Double price, Double extra_charges){
        this.assetService.updateService(id, name, price, extra_charges);
    }

}
