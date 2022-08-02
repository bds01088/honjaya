package com.ssafy.honjaya.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "EmailCheckRes", description = "이메일 체크 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmailCheckRes {
	@ApiModelProperty(value = "중복된 이메일")
	private boolean isDuplicated;
	
	@ApiModelProperty(value = "사용 정지 중인 이메일")
	private boolean isBanned;
	
	@ApiModelProperty(value = "사용 정지 해제 날짜")
	private String banEndDate;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
}
