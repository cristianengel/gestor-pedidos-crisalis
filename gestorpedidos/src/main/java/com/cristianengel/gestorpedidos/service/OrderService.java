package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.model.Order;
import com.cristianengel.gestorpedidos.model.dto.OrderDTO;
import com.cristianengel.gestorpedidos.repository.ClientRepository;
import com.cristianengel.gestorpedidos.repository.OrderDetailRepository;
import com.cristianengel.gestorpedidos.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ClientRepository clientRepository;

    public OrderService(OrderRepository orderRepository, OrderDetailRepository orderDetailRepository, ClientRepository clientRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.clientRepository = clientRepository;
    }
    public Order saveOrder(OrderDTO orderDTO, List<Integer> orderDetailsId, String clientId) {
        for (Integer iterator : orderDetailsId) {
            orderDTO.getOrderDetails().add(this.orderDetailRepository.findById(iterator).orElseThrow(
                    () -> new RuntimeException("OrderDetail not found")
            ));
        }
        orderDTO.setClient(this.clientRepository.findByIdentificationNumber(clientId).orElseThrow(
                () -> new RuntimeException("Client not found")
        ));
        return this.orderRepository.save(new Order(orderDTO));
    }
}
