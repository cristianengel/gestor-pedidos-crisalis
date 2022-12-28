package com.cristianengel.gestorpedidos.repository;

import com.cristianengel.gestorpedidos.model.Good;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface GoodRepository extends JpaRepository<Good, Integer> {
    @Query("select g from Good g where upper(g.name) like upper(concat('%', ?1, '%'))")
    List<Good> searchProduct(String name);
    @Transactional
    @Modifying
    @Query("update Good g set g.name = ?1, g.price = ?2 where g.id = ?3")
    void updateNameAndPriceById(String name, double price, int id);
    Optional<Good> findById(int id);
    Optional<Good> findByName(String name);

    @Query("select g from Good g where upper(g.name) = upper(?1)")
    List<Good> findAllByName(String name);

}
