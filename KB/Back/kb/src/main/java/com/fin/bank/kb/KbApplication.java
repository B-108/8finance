package com.fin.bank.kb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class KbApplication {

	public static void main(String[] args) {
		SpringApplication.run(KbApplication.class, args);
	}

}
