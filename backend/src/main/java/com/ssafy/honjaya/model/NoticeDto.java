package com.ssafy.honjaya.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "Notice", description = "공지사항")
@Data
public class NoticeDto {
	@ApiModelProperty(value = "공지사항 번호, PK")
	private int noticeNo;
	@ApiModelProperty(value = "운영자 유저 번호")
	private int adminNo;
	@ApiModelProperty(value = "제목")
	private String noticeTitle;
	@ApiModelProperty(value = "내용")
	private String noticeContent;
	@ApiModelProperty(value = "등록 시간")
	private String noticeTime;
	@ApiModelProperty(value = "조회수")
	private int noticeReadCount;
	
}
