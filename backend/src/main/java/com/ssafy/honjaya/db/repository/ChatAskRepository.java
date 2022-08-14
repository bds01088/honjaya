package com.ssafy.honjaya.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.honjaya.db.entity.ChatAsk;

public interface ChatAskRepository extends JpaRepository<ChatAsk, Integer> {
	int countByChatAskFrom_UserNoAndChatAskTo_UserNo(int chatAskFrom, int chatAskTo);
	ChatAsk findByChatAskFrom_UserNoAndChatAskTo_UserNo(int chatAskFrom, int chatAskTo);
	void deleteByChatAskTo_UserNo(int userNo);
}
