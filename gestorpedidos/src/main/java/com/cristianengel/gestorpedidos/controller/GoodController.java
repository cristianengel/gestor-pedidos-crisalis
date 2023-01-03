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

    @GetMapping(value = "search", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Good> getAllGoodsByName(@RequestParam String name, int type) {
        return this.goodService.findAllGoods(name, type);
    }

    @PostMapping(value = "delete")
    public void deleteGood(@RequestParam int id, int type) {
        this.goodService.deleteGoodById(id, type);
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
    public void updateProduct(@RequestParam int id, String name, double price){
        this.goodService.updateProduct(id, name, price);
    }

    @PostMapping(value = "update_service")
    public void updateService(@RequestParam int id, String name, double price, double extra_charges){
        this.goodService.updateService(id, name, price, extra_charges);
    }

}
