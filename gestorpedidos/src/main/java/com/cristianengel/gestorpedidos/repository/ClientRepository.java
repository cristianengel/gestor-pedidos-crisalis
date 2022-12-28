package com.cristianengel.gestorpedidos.repository;

import com.cristianengel.gestorpedidos.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    @Transactional
    @Modifying
    @Query("delete from Client c where c.identificationNumber = ?1")
    void deleteByIdentification(String identificationNumber);

    @Query("select c from Client c where c.identificationNumber = ?1")
    List<Client> findByIdentification(String identificationNumber);
}
