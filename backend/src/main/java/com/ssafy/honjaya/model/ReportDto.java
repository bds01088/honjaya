package com.ssafy.honjaya.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "Report", description = "신고")
@Data
public class ReportDto {
	@ApiModelProperty(value = "신고 번호, PK")
	private int reportNo;
	@ApiModelProperty(value = "신고 한 사람")
	private int reportFrom;
	@ApiModelProperty(value = "신고 당한 사람")
	private int reportTo;
	@ApiModelProperty(value = "신고 유형")
	private String reportType;
	@ApiModelProperty(value = "신고 메시지")
	private String reportMessage;
	
}
