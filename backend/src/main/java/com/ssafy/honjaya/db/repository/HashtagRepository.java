package com.ssafy.honjaya.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.honjaya.db.entity.Hashtag;

public interface HashtagRepository extends JpaRepository<Hashtag, Integer> {
	
	@Query(value = "select * from hashtag where user_no = ?1", nativeQuery = true)
	List<Hashtag> findByUserNo(int userNo);
	
}
