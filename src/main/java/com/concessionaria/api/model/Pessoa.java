package com.concessionaria.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@MappedSuperclass
@Data
public abstract class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String nome;

    @NotBlank
    @Column(unique = true)
    private String cpf;

    @Email
    @NotBlank
    private String email;

    private String telefone;
}