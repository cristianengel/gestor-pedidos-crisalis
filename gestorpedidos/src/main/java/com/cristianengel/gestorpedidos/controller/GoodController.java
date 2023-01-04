package com.cristianengel.gestorpedidos.controller;

import com.cristianengel.gestorpedidos.model.Good;
import com.cristianengel.gestorpedidos.model.dto.GoodDTO;
import com.cristianengel.gestorpedidos.service.GoodService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("good")
public class GoodController {

    private final GoodService goodService;


    public GoodController(GoodService goodService) {
        this.goodService = goodService;
    }

    @PostMapping(value = "new", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Good saveGood(@RequestBody GoodDTO goodDTO) {
        return this.goodService.saveGood(goodDTO);
    }

    @GetMapping(value = "search_product", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Good> getAllProductsByName(@RequestParam String name) {
        return this.goodService.findAllGoodsByNameAndType(name, 1);
    }

    @GetMapping(value = "search_service", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Good> getAllServicesByName(@RequestParam String name) {
        return this.goodService.findAllGoodsByNameAndType(name, 2);
    }

    @PostMapping(value = "delete_product")
    public void deleteProduct(@RequestParam int id) {
        this.goodService.deleteProductById(id);
    }

    @PostMapping(value = "delete_service")
    public void deleteService(@RequestParam int id) {
        this.goodService.deleteServiceById(id);
    }

    @GetMapping(value = "get_by_id", produces = MediaType.APPLICATION_JSON_VALUE)
    public GoodDTO findById(@RequestParam int id) {
        return this.goodService.findById(id);
    }

    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GoodDTO> getAllGoods() {
        return this.goodService.getAllGoodsInDB();
    }

    @GetMapping(value = "products", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GoodDTO> getAllProducts() {
        return this.goodService.getAllProductsInDB();
    }

    @GetMapping(value = "services", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GoodDTO> getAllServices() {
        return this.goodService.getAllServicesInDB();
    }

    @PostMapping(value = "update_product")
    public void updateProduct(@RequestParam int id, String name, Double price){
        this.goodService.updateProduct(id, name, price);
    }

    @PostMapping(value = "update_service")
    public void updateService(@RequestParam int id, String name, Double price, Double extra_charges){
        this.goodService.updateService(id, name, price, extra_charges);
    }

}
