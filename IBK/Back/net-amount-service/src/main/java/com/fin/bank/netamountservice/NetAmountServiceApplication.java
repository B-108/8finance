package com.fin.bank.netamountservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class NetAmountServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NetAmountServiceApplication.class, args);
	}

}
