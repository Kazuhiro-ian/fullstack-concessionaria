package com.concessionaria.api.controller;

import com.concessionaria.api.model.Venda;
import com.concessionaria.api.service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendas")
public class VendaController {

    @Autowired
    private VendaService service;

    // Listar o histórico de todas as vendas
    @GetMapping
    public List<Venda> listar() {
        return service.listarTodas();
    }

    // Endpoint para realizar a venda oficial
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Venda realizarVenda(@RequestBody Venda venda) {
        // Aqui o Controller apenas repassa os dados para o Service,
        // onde a regra do Enum (DISPONIVEL -> VENDIDO) será executada.
        return service.realizarVenda(venda);
    }
}