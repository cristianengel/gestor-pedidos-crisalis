package com.cristianengel.gestorpedidos.repository;

import com.cristianengel.gestorpedidos.model.Client;
import com.cristianengel.gestorpedidos.model.Order;
import com.cristianengel.gestorpedidos.model.dto.OrderDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("select o from Order o where o.date = ?1")
    List<Order> findByDate(LocalDate date);
    @Query("select o from Order o where o.client = ?1")
    List<Order> findByClient(Client client);

}
