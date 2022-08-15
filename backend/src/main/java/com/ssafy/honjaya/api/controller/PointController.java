package com.ssafy.honjaya.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.honjaya.api.request.PointReq;
import com.ssafy.honjaya.api.response.PointRes;
import com.ssafy.honjaya.api.service.JwtServiceImpl;
import com.ssafy.honjaya.api.service.PointService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "포인트 API", tags = {"PointController"})
@RestController
@RequestMapping("/points")
public class PointController {
	private static final Logger logger = LoggerFactory.getLogger(PointController.class);
	
	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private PointService pointService;
	
	@ApiOperation(value = "본인 잔여 포인트 확인", response = PointRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping
	public ResponseEntity<PointRes> findPoint(HttpServletRequest request) {
		PointRes pointRes = new PointRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				pointRes.setPoint(pointService.findPoint(userNo));
				pointRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				pointRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			pointRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<PointRes>(pointRes, status);
	}

	@ApiOperation(value = "포인트 증감", response = PointRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 400, message = "포인트 부족"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PutMapping
	public ResponseEntity<PointRes> updatePoint(@RequestBody PointReq pointReq, HttpServletRequest request) {
		PointRes pointRes = new PointRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				pointReq.setUserNo(userNo);
				if (pointService.findPoint(userNo) + pointReq.getPoint() < 0) {
					pointRes.setLow(true);
					status = HttpStatus.BAD_REQUEST;
				} else {
					pointRes.setPoint(pointService.updatePoint(pointReq));
					pointRes.setSuccess(true);
					status = HttpStatus.OK;
				}
			} else {
				logger.error("사용 불가능 토큰!!!");
				pointRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			pointRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<PointRes>(pointRes, status);
	}
}
