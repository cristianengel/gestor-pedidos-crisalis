package com.cristianengel.gestorpedidos.service;

import com.cristianengel.gestorpedidos.model.Asset;
import com.cristianengel.gestorpedidos.model.Order;
import com.cristianengel.gestorpedidos.model.OrderDetail;
import com.cristianengel.gestorpedidos.model.dto.OrderDetailDTO;
import com.cristianengel.gestorpedidos.repository.AssetRepository;
import com.cristianengel.gestorpedidos.repository.OrderDetailRepository;
import com.cristianengel.gestorpedidos.repository.OrderRepository;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;
    private final AssetRepository assetRepository;
    private final OrderRepository orderRepository;

    public OrderDetailService(OrderDetailRepository orderDetailRepository, AssetRepository assetRepository, OrderRepository orderRepository) {
        this.orderDetailRepository = orderDetailRepository;
        this.assetRepository = assetRepository;
        this.orderRepository = orderRepository;
    }

    public OrderDetail saveOrderDetail(OrderDetailDTO orderDetailDTO, int assetId) {
        Asset asset = this.assetRepository.findById(assetId).orElseThrow(
                () -> new RuntimeException("Asset not found.")
        );
        orderDetailDTO.setAsset(asset);
        return this.orderDetailRepository.save(new OrderDetail(orderDetailDTO));
    }
}
