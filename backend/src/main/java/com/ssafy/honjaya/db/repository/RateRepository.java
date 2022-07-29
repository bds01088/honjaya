package com.ssafy.honjaya.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.honjaya.db.entity.Rate;

public interface RateRepository extends JpaRepository<Rate, Integer> {
	
	Rate findByRateFrom_UserNoAndRateTo_UserNo(int rateFrom, int rateTo);
	
	@Query("select round(avg(rate_score), 1) from rate where rate_to = ?1")
	double getAverageRate(int userNo);
	
}
