package com.ssafy.honjaya.config;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//import com.ssafy.honjaya.interceptor.JwtInterceptor;

@Configuration
//@EnableWebMvc
public class JwtConfig implements WebMvcConfigurer {
	
//	@Autowired
//	private JwtInterceptor jwtInterCeptor;
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
//		System.out.println("CORS Setting");
//		Allow all origins.
//		Allow "simple" methods GET, HEAD and POST.
//		Allow all headers.
//		Set max age to 1800 seconds (30 minutes).
		registry.addMapping("/**")
			.allowedOrigins("*")
			.allowedMethods("*")
			.maxAge(6000);
	}
	
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
//		registry.addInterceptor(jwtInterCeptor)
//				.addPathPatterns("/users/**")
//				.addPathPatterns("/chats/**")
//				.addPathPatterns("/hashtags/**")
//				.addPathPatterns("/meetings/**")
//				.addPathPatterns("/points/**")
//				.addPathPatterns("/rates/**")
//				.addPathPatterns("/reports/**")
//				.excludePathPatterns("/users/signup")
//				.excludePathPatterns("/users/find/email/**")
//				.excludePathPatterns("/users/find/nickname/**")
//				.excludePathPatterns("/users/login")
//				.excludePathPatterns("/users/logout")
//				.excludePathPatterns("/users/refresh")
//				.excludePathPatterns("/users/email");
	}
}
