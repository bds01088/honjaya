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
public class LoginRes {
	@ApiModelProperty(value = "액세스 토큰")
	private String accessToken;
	
	@ApiModelProperty(value = "리프레쉬 토큰")
	private String refreshToken;
	
	@ApiModelProperty(value = "유저 정지 객체")
	private BanRes banRes;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
}
