package com.ssafy.honjaya.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.honjaya.db.entity.Ban;

public interface BanRepository extends JpaRepository<Ban, Integer> {
	
	Ban findByBanUserEmail(String banUserEmail);
	void deleteByBanUserEmail(String banUserEmail);
}
