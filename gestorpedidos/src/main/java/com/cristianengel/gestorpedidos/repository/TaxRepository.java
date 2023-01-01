package com.cristianengel.gestorpedidos.repository;

import com.cristianengel.gestorpedidos.model.Tax;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaxRepository extends JpaRepository<Tax, Integer> {
    @Transactional
    @Modifying
    @Query("update Tax t set t.name = ?1, t.percentage = ?2 where t.id = ?3")
    void updateNameAndPercentageById(String name, double percentage, int id);
    @Query("select t from Tax t where upper(t.name) like upper(concat('%', ?1, '%'))")
    List<Tax> searchTax(String name);
    @Query("select t from Tax t where upper(t.name) = upper(?1)")
    Optional<Tax> findByName(String name);
}
