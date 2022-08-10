package com.ssafy.honjaya.api.response;

import com.ssafy.honjaya.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "MeetingUserRes", description = "미팅 안 유저")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MeetingUserRes {
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	
	@ApiModelProperty(value = "닉네임")
	private String userNickname;

	public MeetingUserRes(User user) {
		this.userNo = user.getUserNo();
		this.userNickname = user.getUserNickname();
	}
}
