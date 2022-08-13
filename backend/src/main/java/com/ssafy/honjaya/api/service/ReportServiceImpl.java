package com.ssafy.honjaya.api.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.honjaya.api.request.ReportReq;
import com.ssafy.honjaya.db.entity.Ban;
import com.ssafy.honjaya.db.entity.Report;
import com.ssafy.honjaya.db.entity.User;
import com.ssafy.honjaya.db.repository.BanRepository;
import com.ssafy.honjaya.db.repository.ReportRepository;
import com.ssafy.honjaya.db.repository.UserRepository;

@Service
public class ReportServiceImpl implements ReportService {
	private static final int REPORT_COUNT_TO_BAN_DAYS_3 = 10;
	private static final int REPORT_COUNT_TO_BAN_DAYS_7 = 20;
	private static final int REPORT_COUNT_TO_BAN_DAYS_30 = 30;
	private static final int REPORT_COUNT_TO_BAN_PERM = 40;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ReportRepository reportRepository;
	
	@Autowired
	private BanRepository banRepository;

	@Override
	public void insertReport(ReportReq reportReq) {
		int reportTo = reportReq.getReportTo();
		User reportedUser = userRepository.findById(reportTo).get();
		Report report = Report.builder()
				.reportFrom(userRepository.getOne(reportReq.getReportFrom()))
				.reportTo(reportedUser)
				.reportType(reportReq.getReportType())
				.reportMessage(reportReq.getReportMessage())
				.build();
		reportRepository.save(report);
		
		int reportedCount = reportRepository.countByReportTo_UserNo(reportTo);
		
		Ban ban;
		LocalDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
		switch (reportedCount) {
		case REPORT_COUNT_TO_BAN_DAYS_3:
			banRepository.deleteByBanUserEmail(reportedUser.getUserEmail());
			ban = Ban.builder()
					.banUserEmail(reportedUser.getUserEmail())
					.banTerm(3)
					.banStartTime(now)
					.banEndTime(now.plusDays(3))
					.banMessage("이용자들의 신고 누적으로 인해 3일 정지되었습니다.")
					.build();
			banRepository.save(ban);
			break;
		case REPORT_COUNT_TO_BAN_DAYS_7:
			banRepository.deleteByBanUserEmail(reportedUser.getUserEmail());
			ban = Ban.builder()
					.banUserEmail(reportedUser.getUserEmail())
					.banTerm(7)
					.banStartTime(now)
					.banEndTime(now.plusDays(7))
					.banMessage("이용자들의 신고 누적으로 인해 7일 정지되었습니다.")
					.build();
			banRepository.save(ban);
			break;
		case REPORT_COUNT_TO_BAN_DAYS_30:
			banRepository.deleteByBanUserEmail(reportedUser.getUserEmail());
			ban = Ban.builder()
					.banUserEmail(reportedUser.getUserEmail())
					.banTerm(30)
					.banStartTime(now)
					.banEndTime(now.plusDays(30))
					.banMessage("이용자들의 신고 누적으로 인해 30일 정지되었습니다.")
					.build();
			banRepository.save(ban);
			break;
		case REPORT_COUNT_TO_BAN_PERM:
			banRepository.deleteByBanUserEmail(reportedUser.getUserEmail());
			ban = Ban.builder()
					.banUserEmail(reportedUser.getUserEmail())
					.banTerm(-1)
					.banStartTime(now)
					.banEndTime(LocalDateTime.of(2100, 12, 31, 23, 59))
					.banMessage("이용자들의 신고 누적으로 인해 영구 정지되었습니다.")
					.build();
			banRepository.save(ban);
			break;
		default:
			break;
		}
	}

	public boolean isAlreadyReported(int reportFrom, int reportTo) {
		return reportRepository.countByReportFrom_UserNoAndReportTo_UserNo(reportFrom, reportTo) > 0;
	}

}
