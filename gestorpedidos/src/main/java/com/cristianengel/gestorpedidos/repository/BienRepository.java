package com.cristianengel.gestorpedidos.repository;

import com.cristianengel.gestorpedidos.model.Bien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BienRepository extends JpaRepository<Bien, Integer> {
    Optional<Bien> findById(int id);
}
