package com.ssafy.honjaya.api.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.ssafy.honjaya.api.request.ChatReq;
import com.ssafy.honjaya.api.response.ChatListRes;
import com.ssafy.honjaya.api.response.ChatRes;
import com.ssafy.honjaya.api.service.ChatService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class StompChatController {
	private final SimpMessagingTemplate template; // 특정 Broker로 메세지를 전달
	private final ChatService chatService;

	// Client 가 SEND 할 수 있는 경로
	// stompConfig 에서 설정한 applicationDestinationPrefixes 와 @MessageMapping 경로가 병합됨
	// "/pub/chat/enter"
	@MessageMapping(value="/chat/enter")
	public void enter(ChatReq chatReq) {
//		chatReq.setChatMessage(chatReq.getUserNo() + "님이 채팅방에 참여하였습니다.");
		System.out.println("enter called");

		ChatListRes chats = chatService.getMessages(chatReq.getChatroomNo());

		if (chats != null) {
			for (ChatRes chatRes : chats.getList()) {
				template.convertAndSend("/sub/chat/room/" + chatReq.getChatroomNo(), chatRes);
			}
		}

		// DB에 채팅내용 저장
//		chatService.sendMessage(chatReq);
	}

	@MessageMapping(value="/chat/message")
	public void message(ChatReq chatReq) {
		System.out.println("send called");
		
		ChatRes chatRes = chatService.sendMessage(chatReq); // DB에 채팅내용 저장
		
		template.convertAndSend("/sub/chat/room/" + chatReq.getChatroomNo(), chatRes);
		
	}
}
