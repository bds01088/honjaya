package com.ssafy.honjaya.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.honjaya.api.request.ReportReq;
import com.ssafy.honjaya.api.response.BooleanRes;
import com.ssafy.honjaya.api.response.CommonRes;
import com.ssafy.honjaya.api.service.JwtServiceImpl;
import com.ssafy.honjaya.api.service.ReportService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "신고 API", tags = {"ReportController"})
@RestController
@RequestMapping("/reports")
public class ReportController {
	private static final Logger logger = LoggerFactory.getLogger(ReportController.class);
	
	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private ReportService reportService;

	@ApiOperation(value = "유저 신고", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping
	public ResponseEntity<CommonRes> insertReport(@RequestBody ReportReq reportReq, HttpServletRequest request) {
		CommonRes res = new CommonRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int reportFrom = jwtService.extractUserNo(accessToken);
				reportReq.setReportFrom(reportFrom);
				reportService.insertReport(reportReq);
				res.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				res.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			res.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<CommonRes>(res, status);
	}
	
	@ApiOperation(value = "유저 신고 중복 여부 확인", response = BooleanRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/{userNo}")
	public ResponseEntity<BooleanRes> findReport(@PathVariable int userNo, HttpServletRequest request) {
		BooleanRes booleanRes = new BooleanRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int reportFrom = jwtService.extractUserNo(accessToken);
				booleanRes.setTrueOrFalse(reportService.isAlreadyReported(reportFrom, userNo));
				booleanRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				booleanRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			booleanRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<BooleanRes>(booleanRes, status);
	}
}
