package com.cristianengel.gestorpedidos.repository;

import com.cristianengel.gestorpedidos.model.Tax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TaxRepository extends JpaRepository<Tax, Integer> {
    @Query("select t from Tax t where upper(t.name) = upper(?1)")
    Optional<Tax> findByName(String name);
}
