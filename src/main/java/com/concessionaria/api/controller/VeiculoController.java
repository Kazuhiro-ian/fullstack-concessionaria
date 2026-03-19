package com.concessionaria.api.controller;

import com.concessionaria.api.model.Veiculo;
import com.concessionaria.api.service.VeiculoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/veiculos") // URL base para este controller
public class VeiculoController {

    @Autowired
    private VeiculoService service;

    // Listar todos: GET http://localhost:8080/api/veiculos
    @GetMapping
    public List<Veiculo> listar() {
        return service.listarTodos();
    }

    // Cadastrar: POST http://localhost:8080/api/veiculos
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Veiculo adicionar(@Valid @RequestBody Veiculo veiculo) {
        return service.salvar(veiculo);
    }

    // Buscar por ID: GET http://localhost:8080/api/veiculos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Atualizar: PUT http://localhost:8080/api/veiculos/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizar(@PathVariable Long id, @Valid @RequestBody Veiculo veiculo) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        veiculo.setId(id); // Garante que vamos atualizar o ID certo
        Veiculo veiculoAtualizado = service.salvar(veiculo);
        return ResponseEntity.ok(veiculoAtualizado);
    }

    // Excluir: DELETE http://localhost:8080/api/veiculos/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        if (!service.buscarPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.excluir(id);
        return ResponseEntity.noContent().build(); // Retorna 204 (Sucesso, mas sem conteúdo)
    }
}