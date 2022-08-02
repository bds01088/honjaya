package com.ssafy.honjaya.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.honjaya.api.request.ReportReq;
import com.ssafy.honjaya.api.response.RateRes;
import com.ssafy.honjaya.db.entity.Report;
import com.ssafy.honjaya.db.repository.ReportRepository;
import com.ssafy.honjaya.db.repository.UserRepository;

@Service
public class ReportServiceImpl implements ReportService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ReportRepository reportRepository;

	@Override
	public void insertReport(ReportReq reportReq) {
		Report report = Report.builder()
				.reportFrom(userRepository.getOne(reportReq.getReportFrom()))
				.reportTo(userRepository.getOne(reportReq.getReportTo()))
				.reportType(reportReq.getReportType())
				.reportMessage(reportReq.getReportMessage())
				.build();
		reportRepository.save(report);
	}

	public boolean isAlreadyReported(int reportFrom, int reportTo) {
		return reportRepository.countByReportFrom_UserNoAndReportTo_UserNo(reportFrom, reportTo) > 0;
	}

}
