package com.cristianengel.gestorpedidos.controller;

import com.cristianengel.gestorpedidos.model.OrderDetail;
import com.cristianengel.gestorpedidos.model.dto.OrderDetailDTO;
import com.cristianengel.gestorpedidos.service.OrderDetailService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("order_detail")
public class OrderDetailController {
    private final OrderDetailService orderDetailService;

    public OrderDetailController(OrderDetailService orderDetailService) {
        this.orderDetailService = orderDetailService;
    }

    @PostMapping(value = "new", consumes = MediaType.APPLICATION_JSON_VALUE)
    public OrderDetail saveOrderDetail(@RequestBody OrderDetailDTO orderDetailDTO, @RequestParam int assetId) {
        return this.orderDetailService.saveOrderDetail(orderDetailDTO, assetId);
    }

    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<OrderDetailDTO> getAllOrderDetails() {
        return this.orderDetailService.getAllOrderDetails();
    }

}
