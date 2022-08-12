package com.ssafy.honjaya.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.honjaya.db.entity.ChatroomUser;

public interface ChatroomUserRepository extends JpaRepository<ChatroomUser, Long> {
	
	@Query(value = "select * from chatroom_user where chatroom_no in (select chatroom_no from chatroom_user where user_no = ?1) and user_no != ?1", nativeQuery = true)
	List<ChatroomUser> listChatroom(int userNo);
	
	@Query(value = "select * from chatroom_user where chatroom_no = ?1 and user_no != ?2", nativeQuery = true)
	ChatroomUser findChatroom(long chatroomNo, int myUserNo);
	
	@Query(value = "select count(*) from chatroom_user where chatroom_no in (select chatroom_no from chatroom_user where user_no = ?1) and user_no = ?2", nativeQuery = true)
	int hasChatroomWithHim(int userNo, int him);
	
}
