package com.ssafy.honjaya.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.honjaya.db.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	User findByUserEmail(String userEmail);
	int countByUserEmail(String userEmail);
	User findByUserNickname(String userNickname);
	int countByUserNickname(String userNickname);
	
}
