package com.cristianengel.gestorpedidos.controller;

import com.cristianengel.gestorpedidos.model.Order;
import com.cristianengel.gestorpedidos.model.dto.OrderDTO;
import com.cristianengel.gestorpedidos.service.OrderService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(value = "new", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Order saveOrder(@RequestBody OrderDTO orderDTO) {
        return this.orderService.saveOrder(orderDTO);
    }
}
