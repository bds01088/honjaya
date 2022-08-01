package com.ssafy.honjaya.api.service;

import com.ssafy.honjaya.api.request.RateReq;
import com.ssafy.honjaya.api.response.RateRes;

public interface RateService {
	double getAverageRate(int userNo);
	RateRes findRate(int rateFrom, int rateTo);
	RateRes insertRate(RateReq rateReq);
	RateRes updateRate(int rateNo, RateReq rateReq);
	void deleteRate(int rateNo);
}
