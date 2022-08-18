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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.honjaya.api.request.HashtagReq;
import com.ssafy.honjaya.api.response.CommonRes;
import com.ssafy.honjaya.api.response.HashtagListRes;
import com.ssafy.honjaya.api.response.HashtagRes;
import com.ssafy.honjaya.api.service.HashtagService;
import com.ssafy.honjaya.api.service.JwtServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "해시태그 API", tags = {"HashtagController"})
@RestController
@RequestMapping("/hashtags")
public class HashtagController {
	private static final Logger logger = LoggerFactory.getLogger(HashtagController.class);
	
	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private HashtagService hashtagService;

	@ApiOperation(value = "해시태그 입력", response = HashtagRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping
	public ResponseEntity<HashtagRes> insertHashtag(@RequestBody HashtagReq hashtagReq, HttpServletRequest request) {
		HashtagRes hashtagRes = new HashtagRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				hashtagReq.setUserNo(userNo);
				hashtagRes = hashtagService.insertHashtag(hashtagReq);
				hashtagRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				hashtagRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			hashtagRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<HashtagRes>(hashtagRes, status);
	}
	
	@ApiOperation(value = "본인 해시태그 조회", response = HashtagListRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping
	public ResponseEntity<HashtagListRes> listHashtagMe(HttpServletRequest request) {
		HashtagListRes hashtagListRes = new HashtagListRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				hashtagListRes = hashtagService.listHashtag(userNo);
				hashtagListRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				hashtagListRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			hashtagListRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<HashtagListRes>(hashtagListRes, status);
	}
	
	@ApiOperation(value = "특정 유저 해시태그 조회", response = HashtagListRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/{userNo}")
	public ResponseEntity<HashtagListRes> listHashtag(@PathVariable int userNo, HttpServletRequest request) {
		HashtagListRes hashtagListRes = new HashtagListRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				hashtagListRes = hashtagService.listHashtag(userNo);
				hashtagListRes.setSuccess(true);
				status = HttpStatus.OK;
			} else {
				logger.error("사용 불가능 토큰!!!");
				hashtagListRes.setError("The token is denied");
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			hashtagListRes.setError(e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<HashtagListRes>(hashtagListRes, status);
	}
	
	@ApiOperation(value = "해시태그 삭제", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@DeleteMapping("/{hashNo}")
	public ResponseEntity<CommonRes> deleteHashtag(@PathVariable int hashNo, HttpServletRequest request) {
		CommonRes res = new CommonRes();
		HttpStatus status;
		
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				hashtagService.deleteHashtag(hashNo);
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
}
