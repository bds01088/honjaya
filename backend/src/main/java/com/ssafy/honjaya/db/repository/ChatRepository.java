package com.ssafy.honjaya.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.honjaya.db.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
	
}
