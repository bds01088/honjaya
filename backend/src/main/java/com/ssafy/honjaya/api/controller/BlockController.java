package com.ssafy.honjaya.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.honjaya.api.response.BlockListRes;
import com.ssafy.honjaya.api.response.BooleanRes;
import com.ssafy.honjaya.api.response.CommonRes;
import com.ssafy.honjaya.api.service.JwtServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "차단 API", tags = {"BlockController"})
@RestController
@RequestMapping("/blocks")
public class BlockController {
	private static final Logger logger = LoggerFactory.getLogger(BlockController.class);
	
	@Autowired
	private JwtServiceImpl jwtService;

//	@Autowired
//	private RateService rateService;

	@ApiOperation(value = "유저 차단하기", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/{userNo}")
	public ResponseEntity<CommonRes> insertBlock(@PathVariable int userNo, HttpServletRequest request) {
		return null;
	}
	
	@ApiOperation(value = "차단 목록 확인", response = BlockListRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping
	public ResponseEntity<BlockListRes> listBlock(HttpServletRequest request) {
		return null;
	}
	
	@ApiOperation(value = "유저 차단 해제", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@DeleteMapping("/{blockNo}")
	public ResponseEntity<CommonRes> deleteBlock(@PathVariable int blockNo, HttpServletRequest request) {
		return null;
	}
}
