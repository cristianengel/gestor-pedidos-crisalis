package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.model.Order;
import com.cristianengel.gestorpedidos.model.dto.OrderDTO;
import com.cristianengel.gestorpedidos.repository.ClientRepository;
import com.cristianengel.gestorpedidos.repository.OrderDetailRepository;
import com.cristianengel.gestorpedidos.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<OrderDTO> findByClient(String identification) {
        List<OrderDTO> orderDTOList = new ArrayList<OrderDTO>();
        List<Order> orderList = this.orderRepository.findByClient(this.clientRepository.findByIdentificationNumber(identification).orElseThrow(
                () -> new RuntimeException("Client Not Found")
        ));
        for(Order order : orderList) {
            orderDTOList.add(order.toDTO());
        }
        return orderDTOList;
    }

    public List<OrderDTO> findByDate(LocalDate date) {
        List<OrderDTO> orderDTOList = new ArrayList<OrderDTO>();
        List<Order> orderList = this.orderRepository.findByDate(date);
        for(Order order : orderList) {
            orderDTOList.add(order.toDTO());
        }
        return orderDTOList;
    }

    public List<OrderDTO> getAllOrders() {
        return this.orderRepository
                .findAll()
                .stream()
                .map(Order::toDTO)
                .collect(Collectors.toList());
    }
}
