package com.cvbuilder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("/.env")
public class CVBuilderApplication {
    public static void main(String[] args) {
        SpringApplication.run(CVBuilderApplication.class, args);
    }
}
