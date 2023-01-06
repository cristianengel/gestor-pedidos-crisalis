package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.model.Order;
import com.cristianengel.gestorpedidos.model.dto.OrderDTO;
import com.cristianengel.gestorpedidos.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order saveOrder(OrderDTO orderDTO) {
        return this.orderRepository.save(new Order(orderDTO));
    }
}
