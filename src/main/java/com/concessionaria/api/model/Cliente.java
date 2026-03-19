package com.concessionaria.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "tb_clientes")
@Data
@EqualsAndHashCode(callSuper = true)
public class Cliente extends Pessoa {
    private String endereco;
}