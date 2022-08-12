package com.ssafy.honjaya.api.service;

import com.ssafy.honjaya.api.request.ChatAskReq;
import com.ssafy.honjaya.api.request.ChatReq;
import com.ssafy.honjaya.api.response.ChatListRes;
import com.ssafy.honjaya.api.response.ChatRes;
import com.ssafy.honjaya.api.response.ChatroomListRes;
import com.ssafy.honjaya.api.response.ChatroomRes;

public interface ChatService {
	boolean askChat(ChatAskReq chatAskReq);
	void deleteAsk(int userNo);
	
//	void createChatroom(ChatroomReq chatroomReq);
	ChatroomListRes listChatroom(int userNo);
	ChatroomRes findChatroom(long chatroomNo, int myUserNo);
	void deleteChatroom(long chatroomNo);
	
	ChatListRes getMessages(long chatroomNo);
	ChatRes sendMessage(ChatReq chatReq);
	
}
