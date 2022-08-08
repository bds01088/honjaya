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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.honjaya.api.request.ChatReq;
import com.ssafy.honjaya.api.request.RateReq;
import com.ssafy.honjaya.api.response.ChatListRes;
import com.ssafy.honjaya.api.response.ChatroomListRes;
import com.ssafy.honjaya.api.response.CommonRes;
import com.ssafy.honjaya.api.response.RateRes;
import com.ssafy.honjaya.api.service.JwtServiceImpl;
import com.ssafy.honjaya.api.service.RateService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "채팅 API", tags = {"ChatController"})
@RestController
@RequestMapping("/chats")
public class ChatController {
	private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
	
	@Autowired
	private JwtServiceImpl jwtService;

//	@Autowired
//	private RateService rateService;
	
	@ApiOperation(value = "채팅 신청", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/ask/{userNo}")
	public ResponseEntity<CommonRes> createAsk(@PathVariable int userNo, HttpServletRequest request) {
		return null;
	}
	
	@ApiOperation(value = "본인에게 온 채팅 신청 삭제 (미팅 나가기 버튼 누를 때)", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@DeleteMapping("/ask")
	public ResponseEntity<CommonRes> deleteAsk(@PathVariable int userNo, HttpServletRequest request) {
		return null;
	}

	@ApiOperation(value = "채팅방 목록 조회", response = ChatroomListRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/list")
	public ResponseEntity<ChatroomListRes> listChatroom(HttpServletRequest request) {
		return null;
	}
	
	@ApiOperation(value = "채팅방 삭제", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@DeleteMapping("/exit/{chatroomNo}")
	public ResponseEntity<CommonRes> deleteChatroom(@PathVariable int chatroomNo, HttpServletRequest request) {
		return null;
	}

	@ApiOperation(value = "채팅방 메시지 불러오기", response = ChatListRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/messages/{chatroomNo}")
	public ResponseEntity<ChatListRes> average(@PathVariable int chatroomNo, HttpServletRequest request) {
		return null;
	}
	
	@ApiOperation(value = "채팅 메시지 입력", response = CommonRes.class)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공 (success: true)"),
		@ApiResponse(code = 401, message = "토큰 만료"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping("/message")
	public ResponseEntity<CommonRes> insertChat(@RequestBody ChatReq chatReq, HttpServletRequest request) {
		return null;
	}
}
