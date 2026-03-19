package com.concessionaria.api.repository;

import com.concessionaria.api.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    // Um método extra muito útil: buscar pelo CPF
    Optional<Cliente> findByCpf(String cpf);

    // Verificar se um e-mail já existe antes de cadastrar
    boolean existsByEmail(String email);
}