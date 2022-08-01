package com.ssafy.honjaya.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.honjaya.db.entity.Hashtag;
import com.ssafy.honjaya.db.entity.Rate;

public interface HashtagRepository extends JpaRepository<Hashtag, Integer> {
	
	List<Hashtag> findByUser_UserNo(int userNo);
	
}
