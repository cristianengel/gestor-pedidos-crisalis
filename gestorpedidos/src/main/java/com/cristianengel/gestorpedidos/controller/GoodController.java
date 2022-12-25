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

    @PostMapping(value = "delete")
    public void deleteGood(@RequestParam String name) {
        this.goodService.deleteGoodByName(name);
    }

    @GetMapping(value = "get_by_id", produces = MediaType.APPLICATION_JSON_VALUE)
    public GoodDTO loadGoodById(@RequestParam int id) {
        return this.goodService.loadGoodById(id);
    }

    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<GoodDTO> getAllGoods() {
        return this.goodService.getAllGoodsInDB();
    }
}
