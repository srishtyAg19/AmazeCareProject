package com.hexaware.AmazeCare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.hexaware.AmazeCare")
//@EnableJpaRepositories(basePackages = "com.hexaware.AmazeCare.repository")

@EntityScan(basePackages ="com.hexaware.AmazeCare.model")

public class AmazeCareApplication {

	public static void main(String[] args) {
		SpringApplication.run(AmazeCareApplication.class, args);
	}

}
