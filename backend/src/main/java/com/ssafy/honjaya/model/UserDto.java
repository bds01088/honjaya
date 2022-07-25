package com.ssafy.honjaya.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "UserDto", description = "회원 정보")
@Data
public class UserDto {
	
	@ApiModelProperty(value = "유저 번호, PK")
	private int userNo;
	@ApiModelProperty(value = "이메일")
	private String userEmail;
	@ApiModelProperty(value = "비밀번호")
	private String userPassword;
	@ApiModelProperty(value = "닉네임")
	private String userNickname;
	@ApiModelProperty(value = "이름")
	private String userName;
	@ApiModelProperty(value = "생일")
	private String userBirthday; // 2021-01-01
	@ApiModelProperty(value = "성별")
	private String userGender;
	@ApiModelProperty(value = "전화번호")
	private String userPhone;
	@ApiModelProperty(value = "프로필 사진")
	private String userProfilePicUrl;
	@ApiModelProperty(value = "등록 시간")
	private String userRegTime;
	@ApiModelProperty(value = "포인트")
	private int userPoint;
	@ApiModelProperty(value = "리프레쉬 토큰")
	private String userToken;
	
}
