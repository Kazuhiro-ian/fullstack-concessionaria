package com.concessionaria.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Libera todos os endpoints (/api/vendas, /api/veiculos, etc)
                .allowedOrigins("*") // No futuro, troque o "*" pela URL do seu front (ex: http://localhost:3000)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
                .allowedHeaders("*"); // Libera todos os cabeçalhos (essencial para JSON)
    }
}