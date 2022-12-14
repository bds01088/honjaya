package com.ssafy.honjaya.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.honjaya.api.request.RateReq;
import com.ssafy.honjaya.api.response.CommonRes;
import com.ssafy.honjaya.api.response.RateRes;
import com.ssafy.honjaya.api.service.JwtServiceImpl;
import com.ssafy.honjaya.api.service.RateService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "별점 API", tags = {"RateController"})
@RestController
@RequestMapping("/rates")
public class RateController {
	private static final Logger logger = LoggerFactory.getLogger(RateController.class);
	
	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private RateService rateService;

	@ApiOperation(value = "본인 별점 평균", response = RateRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/average")
	public ResponseEntity<RateRes> averageMe(HttpServletRequest request) {
		RateRes rateRes = new RateRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				rateRes.setRateScore(rateService.getAverageRate(userNo));
				rateRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				rateRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			rateRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<RateRes>(rateRes, status);
	}

	@ApiOperation(value = "특정 유저 별점 평균", response = RateRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/average/{userNo}")
	public ResponseEntity<RateRes> average(@PathVariable int userNo, HttpServletRequest request) {
		RateRes rateRes = new RateRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				rateRes.setRateScore(rateService.getAverageRate(userNo));
				rateRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				rateRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			rateRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<RateRes>(rateRes, status);
	}
	
	@ApiOperation(value = "특정 유저 평가 입력", response = RateRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping
	public ResponseEntity<RateRes> insertRate(@RequestBody RateReq rateReq, HttpServletRequest request) {
		RateRes rateRes = new RateRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				rateReq.setRateFrom(userNo);
				rateRes = rateService.insertRate(rateReq);
				rateRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				rateRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			rateRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<RateRes>(rateRes, status);
	}
	
	@ApiOperation(value = "특정 유저 평가 내역 조회", response = RateReq.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/{userNo}")
	public ResponseEntity<RateRes> findRate(@PathVariable int userNo, HttpServletRequest request) {
		RateRes rateRes = new RateRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int rateFrom = jwtService.extractUserNo(accessToken);
				int rateTo = userNo;
				rateRes = rateService.findRate(rateFrom, rateTo);
				rateRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				rateRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			rateRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<RateRes>(rateRes, status);
	}
	
	@ApiOperation(value = "특정 유저 평가 수정", response = RateRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PutMapping("/{rateNo}")
	public ResponseEntity<RateRes> updateRate(@PathVariable int rateNo, @RequestBody RateReq rateReq, HttpServletRequest request) {
		RateRes rateRes = new RateRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
//				int userNo = jwtService.extractUserNo(accessToken);
//				rateReq.setRateFrom(userNo);
				// rateNo를 통해 바로 데이터베이스에서 rate 정보를 조회하여 그곳에 rateTo가 이미 있으므로 userNo를 가져올 필요가 없다.
				rateRes = rateService.updateRate(rateNo, rateReq);
				rateRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				rateRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			rateRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<RateRes>(rateRes, status);
	}
	
	@ApiOperation(value = "특정 유저 평가 삭제", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@DeleteMapping("/{rateNo}")
	public ResponseEntity<CommonRes> deleteRate(@PathVariable int rateNo, HttpServletRequest request) {
		CommonRes commonRes = new CommonRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				rateService.deleteRate(rateNo);
				commonRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				commonRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			commonRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<CommonRes>(commonRes, status);
	}
}
