package com.concessionaria.api.service;

import com.concessionaria.api.model.Venda;
import com.concessionaria.api.model.Veiculo;
import com.concessionaria.api.model.StatusVeiculo; // Importe o Enum
import com.concessionaria.api.repository.VendaRepository;
import com.concessionaria.api.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    public List<Venda> listarTodas() {
        return vendaRepository.findAll();
    }

     // Realiza a venda validando o ENUM de Status do Veículo.
    @Transactional
    public Venda realizarVenda(Venda venda) {
        // 1. Localizar o veículo no banco
        Veiculo veiculo = veiculoRepository.findById(venda.getVeiculo().getId())
                .orElseThrow(() -> new RuntimeException("Erro: Veículo ID " + venda.getVeiculo().getId() + " não encontrado."));

        // 2. REGRA COM ENUM: Verificar se o status é DISPONIVEL
        // Se o status for VENDIDO ou qualquer outro, a venda é bloqueada.
        if (veiculo.getStatus() != StatusVeiculo.DISPONIVEL) {
            throw new RuntimeException("Operação Negada: O veículo não pode ser vendido pois seu status atual é: " + veiculo.getStatus());
        }

        // 3. Automação de Dados
        // Buscar o preço real do cadastro do veículo para evitar fraudes no JSON
        venda.setValorTotal(veiculo.getPreco());
        venda.setDataVenda(LocalDateTime.now());

        // 4. ATUALIZAÇÃO DO STATUS: De DISPONIVEL para VENDIDO
        veiculo.setStatus(StatusVeiculo.VENDIDO);
        veiculoRepository.save(veiculo);

        // 5. Salvar a transação de venda
        return vendaRepository.save(venda);
    }
}