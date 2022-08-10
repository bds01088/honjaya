package com.ssafy.honjaya.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "UserRes", description = "회원 정보 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserNoRes {
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
}
