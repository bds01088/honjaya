package com.ssafy.honjaya.api.response;

import java.time.format.DateTimeFormatter;

import com.ssafy.honjaya.db.entity.User;

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
public class UserRes {
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
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
	public UserRes(User user) {
		this.userEmail = user.getUserEmail();
		this.userPassword = user.getUserPassword();
		this.userNickname = user.getUserNickname();
		this.userName = user.getUserName();
		this.userBirthday = user.getUserBirthday().toString();
		this.userGender = user.getUserGender();
		this.userPhone = user.getUserPhone();
		this.userProfilePicUrl = user.getUserProfilePicUrl();
		this.userRegTime = user.getUserRegTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
		this.userPoint = user.getUserPoint();
	}
	
}
