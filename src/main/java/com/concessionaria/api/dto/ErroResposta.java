package com.concessionaria.api.dto;

import java.time.LocalDateTime;

public record ErroResposta(int status, String mensagem, LocalDateTime timestamp) {}