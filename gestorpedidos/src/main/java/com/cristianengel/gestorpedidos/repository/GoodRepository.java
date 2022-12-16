package com.cristianengel.gestorpedidos.repository;

import com.cristianengel.gestorpedidos.model.Good;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GoodRepository extends JpaRepository<Good, Integer> {
    Optional<Good> findById(int id);
    Optional<Good> findByName(String name);
}
