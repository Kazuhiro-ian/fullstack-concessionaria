package com.concessionaria.api.repository;

import com.concessionaria.api.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    // O JpaRepository já traz pronto:
    // save(), findById(), findAll(), deleteById(), etc.
}