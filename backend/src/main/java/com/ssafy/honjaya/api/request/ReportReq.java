package com.ssafy.honjaya.api.request;

import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value = "ReportReq", description = "신고 Req")
public class ReportReq {
	@ApiModelProperty(value = "신고 한 사람")
	private int reportFrom;
	
	@ApiModelProperty(value = "신고 당한 사람")
	private int reportTo;
	
	@ApiModelProperty(value = "신고 유형")
	@Size(min = 3, max = 3)
	private String reportType;
	
	@ApiModelProperty(value = "신고 메시지")
	@Size(max = 255)
	private String reportMessage;
	
}
