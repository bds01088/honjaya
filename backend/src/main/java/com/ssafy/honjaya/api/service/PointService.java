package com.ssafy.honjaya.api.service;

import com.ssafy.honjaya.api.request.PointReq;

public interface PointService {
	int findPoint(int userNo);
	int updatePoint(PointReq pointReq);
}
