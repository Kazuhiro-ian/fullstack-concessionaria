package com.concessionaria.api.repository;

import com.concessionaria.api.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    // Buscar funcionário pela matrícula
    Optional<Funcionario> findByMatricula(String matricula);

    // Buscar funcionário pelo CPF
    Optional<Funcionario> findByCpf(String cpf);
}