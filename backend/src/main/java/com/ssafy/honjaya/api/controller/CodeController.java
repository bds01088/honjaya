package com.ssafy.honjaya.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.honjaya.api.response.CodeListRes;
import com.ssafy.honjaya.api.service.JwtServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "공통 코드 API", tags = {"CodeController"})
@RestController
@RequestMapping("/codes")
public class CodeController {
	private static final Logger logger = LoggerFactory.getLogger(CodeController.class);
	
	@Autowired
	private JwtServiceImpl jwtService;

//	@Autowired
//	private RateService rateService;
	
	@ApiOperation(value = "그룹 코드에 해당하는 공통 코드 리스트", response = CodeListRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/{groupCode}")
	public ResponseEntity<CodeListRes> findPoint(@PathVariable String groupCode, HttpServletRequest request) {
		return null;
	}
	
}
