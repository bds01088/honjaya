package com.ssafy.honjaya.db.mapper;

import java.util.Map;

import com.ssafy.honjaya.db.RateDto;

public interface RateMapper {
	public RateDto rateSelect(Map<String, Integer> users);
	public int rateInsert(RateDto rateDto);
	public int rateUpdate(RateDto rateDto);
	public int rateDelete(int rateNo);
	
	public double rateAverage(int userNo);
}
