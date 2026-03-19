package com.concessionaria.api.service;

import com.concessionaria.api.model.Veiculo;
import com.concessionaria.api.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository repository;

    // Método para listar todos
    public List<Veiculo> listarTodos() {
        return repository.findAll();
    }

    // Método para salvar (cadastrar ou editar)
    public Veiculo salvar(Veiculo veiculo) {
        return repository.save(veiculo);
    }

    // Buscar um veículo específico por ID
    public Optional<Veiculo> buscarPorId(Long id) {
        return repository.findById(id);
    }

    // Excluir um veículo
    public void excluir(Long id) {
        repository.deleteById(id);
    }
}