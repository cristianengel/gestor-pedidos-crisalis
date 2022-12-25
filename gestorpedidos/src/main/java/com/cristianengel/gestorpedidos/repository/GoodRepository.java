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
    @Transactional
    @Modifying
    @Query("delete from Good g where g.name = ?1")
    void deleteByName(String name);
    Optional<Good> findById(int id);
    Optional<Good> findByName(String name);

    @Query("select g from Good g where upper(g.name) = upper(?1)")
    List<Good> findAllByName(String name);

}
