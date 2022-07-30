package com.ssafy.honjaya.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "LoginRes", description = "로그인 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BooleanRes {
	@ApiModelProperty(value = "true or false")
	private boolean trueOrFalse;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
}
