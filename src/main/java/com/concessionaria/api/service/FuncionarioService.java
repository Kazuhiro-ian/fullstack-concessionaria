package com.concessionaria.api.service;

import com.concessionaria.api.model.Funcionario;
import com.concessionaria.api.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository repository;

    public List<Funcionario> listarTodos() {
        return repository.findAll();
    }

    public Funcionario salvar(Funcionario funcionario) {
        // Validar CPF duplicado
        Optional<Funcionario> funcExistente = repository.findByCpf(funcionario.getCpf());
        if (funcExistente.isPresent() && !funcExistente.get().getId().equals(funcionario.getId())) {
            throw new RuntimeException("CPF já cadastrado para outro funcionário");
        }

        // Lógica de Matrícula (Exemplo simples: se vazio, gera uma)
        if (funcionario.getMatricula() == null || funcionario.getMatricula().isEmpty()) {
            funcionario.setMatricula("MAT-" + System.currentTimeMillis());
        }

        return repository.save(funcionario);
    }

    public Optional<Funcionario> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public void excluir(Long id) {
        // É uma boa prática verificar se existe antes de tentar deletar
        if (!repository.existsById(id)) {
            throw new RuntimeException("Funcionário não encontrado com o ID: " + id);
        }
        repository.deleteById(id);
    }
}