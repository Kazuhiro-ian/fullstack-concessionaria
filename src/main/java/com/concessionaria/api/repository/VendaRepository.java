package com.concessionaria.api.repository;

import com.concessionaria.api.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

    // Método extra para buscar todas as vendas de um cliente específico
    List<Venda> findByClienteId(Long clienteId);

    // Método extra para buscar todas as vendas de um vendedor específico
    List<Venda> findByVendedorId(Long funcionarioId);
}