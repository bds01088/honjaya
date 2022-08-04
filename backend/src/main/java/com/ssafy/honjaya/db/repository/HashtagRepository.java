package com.ssafy.honjaya.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.honjaya.db.entity.Hashtag;

public interface HashtagRepository extends JpaRepository<Hashtag, Integer> {
	
	List<Hashtag> findByUser_UserNo(int userNo);
	
}
