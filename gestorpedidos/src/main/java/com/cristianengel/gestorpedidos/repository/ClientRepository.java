package com.cristianengel.gestorpedidos.repository;

import com.cristianengel.gestorpedidos.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    @Query("select c from Client c where c.identificationNumber = ?1")
    Optional<Client> findByIdentificationNumber(String identificationNumber);
    @Transactional
    @Modifying
    @Query("update Client c set c.isBusiness = ?1, c.name = ?2, c.lastname = ?3, c.address = ?4, c.phoneNumber = ?5, c.email = ?6, c.businessName = ?7, c.businessStartDate = ?8, c.ownerId = ?9 " +
            "where c.identificationNumber = ?10")
    void updateClientAttributes(boolean isBusiness, String name, String lastname, String address, String phoneNumber, String email, String businessName, LocalDate businessStartDate, String ownerId, String identificationNumber);
    @Transactional
    @Modifying
    @Query("delete from Client c where c.identificationNumber = ?1")
    void deleteByIdentification(String identificationNumber);

    @Query("select c from Client c where c.identificationNumber = ?1 or c.ownerId = ?1")
    List<Client> findByIdentification(String identificationNumber);
}
