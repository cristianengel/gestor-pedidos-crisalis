package com.cristianengel.gestorpedidos.controller;

import com.cristianengel.gestorpedidos.model.Order;
import com.cristianengel.gestorpedidos.model.OrderDetail;
import com.cristianengel.gestorpedidos.model.dto.OrderDTO;
import com.cristianengel.gestorpedidos.service.OrderService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(value = "new", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Order saveOrder(@RequestBody OrderDTO orderDTO, @RequestParam List<Integer> orderDetailsId, String clientId) {
        return this.orderService.saveOrder(orderDTO, orderDetailsId, clientId);
    }
}
