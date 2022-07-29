package com.ssafy.honjaya.db.mapper;

import java.util.List;

import com.ssafy.honjaya.db.ChatDto;

public interface ChatMapper {
	public List<ChatDto> chatList(int chatroomNo);
	public int chatInsert(ChatDto chatDto);
	public ChatDto chatSelect(int chatNo);
	
	public int chatRead(int chatNo);
	
}
