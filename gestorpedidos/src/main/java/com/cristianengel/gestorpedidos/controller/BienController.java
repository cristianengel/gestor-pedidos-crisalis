package com.cristianengel.gestorpedidos.controller;

import com.cristianengel.gestorpedidos.model.Bien;
import com.cristianengel.gestorpedidos.model.dto.BienDTO;
import com.cristianengel.gestorpedidos.service.BienService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("bien")
public class BienController {

    private final BienService bienService;


    public BienController(BienService bienService) {
        this.bienService = bienService;
    }

    @PostMapping(value = "nuevobien", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Bien saveBien(@RequestBody BienDTO bienDTO) {
        return this.bienService.saveBien(bienDTO);
    }

    @GetMapping(value = "buscarbien", produces = MediaType.APPLICATION_JSON_VALUE)
    public BienDTO loadBien(@RequestParam int id) {
        return this.bienService.loadBien(id);
    }


    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<BienDTO> getAllBienes() {
        return this.bienService.getAllBienesInDB();
    }
}
