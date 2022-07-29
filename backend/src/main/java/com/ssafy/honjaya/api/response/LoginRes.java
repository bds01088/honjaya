package com.ssafy.honjaya.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "UserDto", description = "회원 정보")
@Data
public class LoginRes {
	@ApiModelProperty(value = "액세스 토큰")
	private String accessToken;
	
	@ApiModelProperty(value = "리프레쉬 토큰")
	private String refreshToken;
	
}
