package com.ssafy.honjaya.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import com.ssafy.honjaya.api.request.MeetingReq;
import com.ssafy.honjaya.api.response.MeetingRes;
import com.ssafy.honjaya.api.service.JwtServiceImpl;
import com.ssafy.honjaya.api.service.MeetingService;
import com.ssafy.honjaya.util.ServletUtil;

import io.swagger.annotations.Api;

@Api(value = "미팅 API", tags = { "MeetingController" })
@RestController
@RequestMapping("/meetings")
public class MeetingController {
	private static final Logger logger = LoggerFactory.getLogger(MeetingController.class);

	@Autowired
	private JwtServiceImpl jwtService;

	@Autowired
	private MeetingService meetingService;

	@PostMapping("/ready")
	@ResponseBody
	public DeferredResult<MeetingRes> readyMeeting(@RequestBody MeetingReq meetingReq) {
		String sessionId = ServletUtil.getSession().getId(); // 테스트에서는 세션 아이디, 나중에는 액세스 토큰에서 유저 아이디를 추출함
		logger.info(">> Join request. session id : {}", sessionId);

		meetingReq.setSessionId(sessionId);
//		user.setUserNo(userNo);
		final DeferredResult<MeetingRes> deferredResult = new DeferredResult<>(null);
		meetingService.readyMeeting(meetingReq, deferredResult);
		
		deferredResult.onCompletion(() -> meetingService.cancelChatRoom(meetingReq));
		deferredResult.onError((throwable) -> meetingService.cancelChatRoom(meetingReq));
		deferredResult.onTimeout(() -> meetingService.timeout(meetingReq));
		
		return deferredResult;
	}

	@PostMapping("/cancel")
	@ResponseBody
	public ResponseEntity<Void> cancelRequest(@RequestBody MeetingReq meetingReq) {
		String sessionId = ServletUtil.getSession().getId(); // 테스트에서는 세션 아이디, 나중에는 액세스 토큰에서 유저 아이디를 추출함
		logger.info(">> Cancel request. session id : {}", sessionId);

		final MeetingReq user = new MeetingReq(sessionId, 0, "m", 0, false, 0);
		meetingService.cancelChatRoom(user);

		return ResponseEntity.ok().build();
	}
}
