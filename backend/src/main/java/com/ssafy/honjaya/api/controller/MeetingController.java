package com.ssafy.honjaya.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import com.ssafy.honjaya.api.request.MeetingReq;
import com.ssafy.honjaya.api.response.MeetingRes;
import com.ssafy.honjaya.api.service.JwtServiceImpl;
import com.ssafy.honjaya.api.service.MeetingService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "미팅 매칭 API", tags = {"MeetingController"})
@RestController
@RequestMapping("/meetings")
public class MeetingController {
	private static final Logger logger = LoggerFactory.getLogger(MeetingController.class);

	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private MeetingService meetingService;

	@ApiOperation(value = "미팅 매칭 대기", response = MeetingRes.class)
	@PostMapping("/ready")
	public DeferredResult<MeetingRes> readyMeeting(@RequestBody MeetingReq meetingReq, HttpServletRequest request) {
		final DeferredResult<MeetingRes> deferredResult = new DeferredResult<>(null);
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				logger.info(">> Join request. userNo : {}", userNo);
				meetingReq.setUserNo(userNo);
				
				meetingService.readyMeeting(meetingReq, deferredResult);
				
				deferredResult.onCompletion(() -> meetingService.cancelChatRoom(meetingReq));
				deferredResult.onError((throwable) -> meetingService.cancelChatRoom(meetingReq));
				deferredResult.onTimeout(() -> meetingService.timeout(meetingReq));
				
			} else {
				logger.error("사용 불가능 토큰!!!");
				MeetingRes meetingRes = new MeetingRes();
				meetingRes.setError("The token is denied");
				meetingRes.setUnauthorized(true);
				deferredResult.setResult(meetingRes);
			}
		} catch (Exception e) {
			MeetingRes meetingRes = new MeetingRes();
			meetingRes.setError(e.getMessage());
			deferredResult.setResult(meetingRes);
		}
		return deferredResult; // 오류가 생기면 리턴 위치가 정확한지부터 체크!
	}

	@ApiOperation(value = "매칭 취소", response = MeetingRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/cancel")
	public ResponseEntity<Void> cancelRequest(HttpServletRequest request) {
		try {
			String accessToken = request.getHeader("access-token");
			if (jwtService.checkToken(accessToken)) {
				int userNo = jwtService.extractUserNo(accessToken);
				logger.info(">> Cancel request. session id : {}", userNo);
				final MeetingReq meetingReq = new MeetingReq(userNo, 0, 0);
				
				meetingService.cancelChatRoom(meetingReq);

				return ResponseEntity.ok().build();
				
			} else {
				logger.error("사용 불가능 토큰!!!");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
