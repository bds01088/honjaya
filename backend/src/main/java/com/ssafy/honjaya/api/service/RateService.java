package com.ssafy.honjaya.api.service;

import com.ssafy.honjaya.db.entity.Rate;

public interface RateService {
	Rate detail(int rateFrom, int rateTo);
	Rate insert(Rate rate);
	Rate update(int rateNo);
	void delete(int rateNo);
	double getAverageRate(int userNo);
}
