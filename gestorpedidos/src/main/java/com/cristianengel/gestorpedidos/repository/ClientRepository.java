package com.cristianengel.gestorpedidos.repository;

import com.cristianengel.gestorpedidos.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    @Query("select c from Client c where c.identificationNumber = ?1")
    Optional<Client> findByIdentification(@NonNull String identificationNumber);

}
