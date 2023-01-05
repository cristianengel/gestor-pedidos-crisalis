package com.cristianengel.gestorpedidos.repository;

import com.cristianengel.gestorpedidos.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface GoodRepository extends JpaRepository<Asset, Integer> {
    @Transactional
    @Modifying
    @Query("delete from Asset g where g.id = ?1 and g.type = ?2")
    void deleteByIdAndType(int id, int type);
    @Transactional
    @Modifying
    @Query("update Asset g set g.name = ?1, g.price = ?2, g.extraCharges = ?3 where g.id = ?4")
    void updateNameAndPriceAndExtraChargesById(String name, double price, double extraCharges, int id);

    @Query("select g from Asset g where upper(g.name) like upper(concat('%', ?1, '%')) and g.type = ?2")
    List<Asset> findAllByNameAndType(String name, int type);

    @Transactional
    @Modifying
    @Query("update Asset g set g.name = ?1, g.price = ?2 where g.id = ?3")
    void updateProductNameAndPriceById(String name, Double price, int id);

    @Query("select g from Asset g where g.type = ?1")
    List<Asset> findAllByType(int type);
}
