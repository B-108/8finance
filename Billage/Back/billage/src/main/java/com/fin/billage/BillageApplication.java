package com.fin.billage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling // 스케쥴링 사용
public class BillageApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillageApplication.class, args);
	}

}
