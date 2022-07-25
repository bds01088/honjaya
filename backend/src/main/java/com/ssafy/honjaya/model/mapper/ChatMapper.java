package com.ssafy.honjaya.model.mapper;

import java.util.List;

import com.ssafy.honjaya.model.ChatDto;

public interface ChatMapper {
	public List<ChatDto> chatList(int chatroomNo);
	public int chatInsert(ChatDto chatDto);
	public ChatDto chatSelect(int chatNo);
	
	public int chatRead(int chatNo);
	
}
