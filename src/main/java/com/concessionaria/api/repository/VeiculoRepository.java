package com.concessionaria.api.repository;

import com.concessionaria.api.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

    // Busca todos os veículos, exceto os que têm o status passado por parâmetro
    // Ex: repository.findByStatusNot("VENDIDO");
    List<Veiculo> findByStatusNot(String status);

    // OU, se você preferir buscar explicitamente os disponíveis:
    List<Veiculo> findByStatus(String status);
}