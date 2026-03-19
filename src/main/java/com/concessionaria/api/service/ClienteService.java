package com.concessionaria.api.service;

import com.concessionaria.api.model.Cliente;
import com.concessionaria.api.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public List<Cliente> listarTodos() {
        return repository.findAll();
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Cliente salvar(Cliente cliente) {
        // Regra de Negócio: Verificar se o CPF já existe
        Optional<Cliente> clienteExistente = repository.findByCpf(cliente.getCpf());

        if (clienteExistente.isPresent() && !clienteExistente.get().getId().equals(cliente.getId())) {
            throw new RuntimeException("Já existe um cliente cadastrado com este CPF");
        }

        return repository.save(cliente);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}