package com.ssafy.honjaya.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.honjaya.db.entity.Chatroom;

public interface ChatroomRepository extends JpaRepository<Chatroom, Long> {
	
}
