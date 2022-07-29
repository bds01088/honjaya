package com.ssafy.honjaya.db;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "UserOauthDto", description = "SNS 로그인 정보")
@Data
public class UserOauthDto {
	@ApiModelProperty(value = "Oauth 번호, PK")
	private int oauthNo;
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	@ApiModelProperty(value = "Oauth")
	private String oauthProvider;
	
}
