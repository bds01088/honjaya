package com.ssafy.honjaya.config;

import java.util.concurrent.Executor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfiguration {

	@Bean
	public Executor asyncThreadPool() {
		ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();

		taskExecutor.setCorePoolSize(12); // 기본 스레드 수
		taskExecutor.setMaxPoolSize(36); // 최대 스레드 수
		taskExecutor.setQueueCapacity(1000); // Queue 사이즈
		taskExecutor.setThreadNamePrefix("Async-Executor-");
		taskExecutor.setDaemon(true);
		taskExecutor.setAwaitTerminationSeconds(60); // 1분
		taskExecutor.initialize();

		return taskExecutor;
	}
}
