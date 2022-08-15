package com.ssafy.honjaya.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.honjaya.db.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Integer> {
	
	int countByReportFrom_UserNoAndReportTo_UserNo(int reportFrom, int reportTo); // 존재 여부
	int countByReportTo_UserNo(int userNo); // 누적 횟수
	
}
