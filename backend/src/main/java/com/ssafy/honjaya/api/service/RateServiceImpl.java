package com.ssafy.honjaya.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.honjaya.db.entity.Rate;
import com.ssafy.honjaya.db.repository.RateRepository;

@Service
public class RateServiceImpl implements RateService{

	@Autowired
	private RateRepository rateRepository;
	
	@Override
	public Rate detail(int rateFrom, int rateTo) {		
		return rateRepository.findByRateFrom_UserNoAndRateTo_UserNo(rateFrom, rateTo);
	}

	@Override
	public Rate insert(Rate rate) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Rate update(int rateNo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(int rateNo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public double getAverageRate(int userNo) {
		// TODO Auto-generated method stub
		return 0;
	}

}
