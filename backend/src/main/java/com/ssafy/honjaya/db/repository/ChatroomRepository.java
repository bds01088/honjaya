package com.ssafy.honjaya.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.honjaya.db.entity.Chatroom;

public interface ChatroomRepository extends JpaRepository<Chatroom, Long> {
	int countByChatroomNo(long chatroomNo);
	
	@Query(value = "delete from chatroom where chatroom_no in (select chatroom_no from chatroom_user where user_no = ?1)", nativeQuery = true)
	void deleteByUserNo(int userNo);
}
