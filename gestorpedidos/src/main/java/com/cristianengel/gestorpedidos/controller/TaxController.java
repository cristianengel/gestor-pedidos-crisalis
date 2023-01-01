package com.cristianengel.gestorpedidos.controller;

import com.cristianengel.gestorpedidos.model.Tax;
import com.cristianengel.gestorpedidos.model.dto.TaxDTO;
import com.cristianengel.gestorpedidos.service.TaxService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tax")
public class TaxController {

    private final TaxService taxService;

    public TaxController(TaxService taxService) {
        this.taxService = taxService;
    }

    @PostMapping(value = "new", produces = MediaType.APPLICATION_JSON_VALUE)
    public Tax saveTax(@RequestBody TaxDTO taxDTO) {
        return this.taxService.saveTax(taxDTO);
    }

    @PostMapping(value = "delete")
    public void deleteTax(@RequestParam int id) {
        this.taxService.deleteTaxById(id);
    }

    @GetMapping(value = "search", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Tax> searchTax(String name) {
        return this.taxService.searchTax(name);
    }

    @PostMapping(value = "update")
    public void updateProduct(@RequestParam int id, String name, double percentage) {
        this.taxService.updateTax(id, name, percentage);
    }

    @GetMapping(value = "get_by_name", produces = MediaType.APPLICATION_JSON_VALUE)
    public TaxDTO loadTaxByName(@RequestParam String name) {
        return this.taxService.loadTaxByName(name);
    }

    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TaxDTO> getAllTaxes() {
        return this.taxService.getAllTaxesInDB();
    }
}
