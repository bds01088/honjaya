package com.ssafy.honjaya.api.service;

import com.ssafy.honjaya.api.request.ChatAskReq;
import com.ssafy.honjaya.api.request.ChatReq;
import com.ssafy.honjaya.api.request.ChatroomReq;
import com.ssafy.honjaya.api.response.ChatListRes;
import com.ssafy.honjaya.api.response.ChatroomListRes;

public interface ChatService {
	boolean askChat(ChatAskReq chatAskReq);
	void deleteAsk(int userNo);
	
//	void createChatroom(ChatroomReq chatroomReq);
	ChatroomListRes listChatroom(int userNo);
	void deleteChatroom(int chatroomNo);
	
	ChatListRes getMessages(int userNo, int chatroomNo);
	void sendMessage(ChatReq chatReq);
	
}
