package com.concessionaria.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "tb_veiculos")
@Data
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    private String marca;

    @NotBlank
    @Size(max = 50)
    private String modelo;

    @NotNull
    @Min(1900)
    private Integer ano;

    @NotBlank
    @Column(unique = true)
    @Pattern(regexp = "[A-Z]{3}[0-9][0-9A-Z][0-9]{2}", message = "Placa deve seguir o padrão Mercosul")
    private String placa;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Positive(message = "O preço deve ser maior que zero")
    private BigDecimal preco;

    @Enumerated(EnumType.STRING)
    private StatusVeiculo status = StatusVeiculo.DISPONIVEL;

    // Opcional: Um campo para quilometragem ou cor
    private Integer quilometragem;
}