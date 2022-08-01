package com.ssafy.honjaya.api.service;

import com.ssafy.honjaya.api.request.ReportReq;

public interface ReportService {
	void insertReport(ReportReq reportReq);
	boolean isAlreadyReported(int reportFrom, int reportTo);
}
