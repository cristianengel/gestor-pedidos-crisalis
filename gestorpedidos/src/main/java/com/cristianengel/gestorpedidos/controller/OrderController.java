package com.cristianengel.gestorpedidos.controller;

import com.cristianengel.gestorpedidos.model.Order;
import com.cristianengel.gestorpedidos.model.dto.OrderDTO;
import com.cristianengel.gestorpedidos.service.OrderService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @GetMapping(value = "list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<OrderDTO> getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @GetMapping(value = "get_by_client", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<OrderDTO> getAllOrdersByClient(@RequestParam String identification) {
        return this.orderService.findByClient(identification);
    }

    @GetMapping(value = "get_by_date", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<OrderDTO> getAllOrdersByClient(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return this.orderService.findByDate(date);
    }

    @PostMapping(value = "delete")
    public void deleteOrder(@RequestParam int id) {
        this.orderService.deleteOrder(id);
    }
}
