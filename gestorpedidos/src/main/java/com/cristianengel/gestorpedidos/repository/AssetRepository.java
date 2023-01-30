package com.cristianengel.gestorpedidos.repository;

import com.cristianengel.gestorpedidos.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Integer> {
    @Transactional
    @Modifying
    @Query("delete from Asset a where a.id = ?1 and a.type = ?2")
    void deleteByIdAndType(int id, int type);

    @Query("select g from Asset g where upper(g.name) like upper(concat('%', ?1, '%')) and g.type = ?2")
    List<Asset> findAllByNameAndType(String name, int type);

    @Query("select g from Asset g where g.type = ?1")
    List<Asset> findAllByType(int type);
}
