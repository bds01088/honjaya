package com.ssafy.honjaya.api.controller;

import java.util.List;

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
		chatReq.setChatMessage(chatReq.getUserNo() + "님이 채팅방에 참여하였습니다.");

		ChatListRes chats = chatService.getMessages(chatReq.getUserNo(), chatReq.getChatroomNo());

		if (chats != null) {
			for (ChatRes c : chats.getList()) {
				chatReq.setWriter(c.get()); // 1234 ChatRes 수정 필요
				chatReq.setMessage(c.getMessage());
			}
		}

		template.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);

		ChatRoomEntity chatRoomEntity = crr.findByRoomId(message.getRoomId());
		ChatMessageSaveDTO chatMessageSaveDTO = new ChatMessageSaveDTO(message.getRoomId(), message.getWriter(),
				message.getMessage());
		cr.save(ChatMessageEntity.toChatEntity(chatMessageSaveDTO, chatRoomEntity));
	}

	@MessageMapping(value="/chat/message")
	public void message(ChatMessageDetailDTO message) {
		template.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);

		// DB에 채팅내용 저장
		ChatRoomEntity chatRoomEntity = crr.findByRoomId(message.getRoomId());
		ChatMessageSaveDTO chatMessageSaveDTO = new ChatMessageSaveDTO(message.getRoomId(), message.getWriter(),
				message.getMessage());
		cr.save(ChatMessageEntity.toChatEntity(chatMessageSaveDTO, chatRoomEntity));
	}
}
