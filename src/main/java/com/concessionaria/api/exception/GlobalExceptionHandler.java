package com.concessionaria.api.exception; // Ou .infra

import com.concessionaria.api.dto.ErroResposta;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice // Esta anotação diz ao Spring: "Assista todos os Controllers"
public class GlobalExceptionHandler {

    // Este método captura erros de lógica (como o do VendaService)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErroResposta> tratarErroDeNegocio(RuntimeException ex) {
        ErroResposta erro = new ErroResposta(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                LocalDateTime.now()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

    // Este captura erros de banco de dados (ex: CPF duplicado)
    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<ErroResposta> tratarErroBanco(Exception ex) {
        ErroResposta erro = new ErroResposta(
                HttpStatus.CONFLICT.value(),
                "Erro de integridade: Este registro (CPF ou Placa) já existe no banco.",
                LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(erro);
    }
}