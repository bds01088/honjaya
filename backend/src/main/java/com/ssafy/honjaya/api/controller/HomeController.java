package com.ssafy.honjaya.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	@GetMapping(value="/")
	public String index() {
		return "index.html";
	}
	
	@GetMapping(value="/index")
	public String login() {
		return "index.html";
	}
}
