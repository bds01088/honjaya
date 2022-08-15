package com.ssafy.honjaya.api.response;

import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "UserProfileInfoRes", description = "회원 프로필 정보 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserProfileInfoRes {
	@ApiModelProperty(value = "닉네임")
	private String userNickname;
	
	@ApiModelProperty(value = "프로필 사진")
	private String userProfilePicUrl;
	
	@ApiModelProperty(value = "성별")
	private String userGender;
	
	@ApiModelProperty(value = "해시태그 리스트")
	List<String> hashtags;
	
	@ApiModelProperty(value = "별점")
	private double rateScore;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
}
