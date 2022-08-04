package com.ssafy.honjaya.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.honjaya.db.entity.ChatAsk;

public interface ChatAskRepository extends JpaRepository<ChatAsk, Integer> {
	ChatAsk findByChatAskFrom_UserNoAndChatAskTo_UserNo(int chatAskFrom, int chatAskTo);
	void deleteByChatAskTo_UserNo(int userNo);
}
