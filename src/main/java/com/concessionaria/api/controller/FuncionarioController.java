package com.concessionaria.api.controller;

import com.concessionaria.api.model.Funcionario;
import com.concessionaria.api.service.FuncionarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService service;

    @GetMapping
    public List<Funcionario> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Funcionario adicionar(@Valid @RequestBody Funcionario funcionario) {
        return service.salvar(funcionario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        if (service.buscarPorId(id).isPresent()) {
            service.excluir(id);
            return ResponseEntity.noContent().build(); // Retorna Status 204 (Sucesso sem conteúdo)
        }
        return ResponseEntity.notFound().build(); // Retorna Status 404 se o ID não existir
    }
}