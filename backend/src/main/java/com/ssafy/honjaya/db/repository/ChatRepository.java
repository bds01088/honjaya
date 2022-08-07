package com.ssafy.honjaya.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.honjaya.db.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
	List<Chat> findAllByChatroom_ChatroomNo(int chatroomNo);
}
