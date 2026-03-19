package com.concessionaria.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "tb_funcionarios")
@Data
@EqualsAndHashCode(callSuper = true)
public class Funcionario extends Pessoa {
    private String cargo;
    private String matricula;
}