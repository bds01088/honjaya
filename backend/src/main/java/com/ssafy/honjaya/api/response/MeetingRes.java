package com.ssafy.honjaya.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "MeetingRes", description = "미팅 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MeetingRes {
	@ApiModelProperty(value = "미팅방 UUID")
	private String uuid;
	
	@ApiModelProperty(value = "유저 (유저 번호, 닉네임)")
	private MeetingUserRes user;
	
	@ApiModelProperty(value = "Pair(아바타-지시자) 유저 (유저 번호, 닉네임)")
	private MeetingUserRes pairUser;
	
	@ApiModelProperty(value = "역할 코드 (1:솔로 / 2:아바타 / 3:지시자)")
	private int roleCode;
	
	@ApiModelProperty(value = "방 팀원 수")
	private int total;
	
	@ApiModelProperty(value = "응답 결과 (1:성공 / 0:취소 / -1:timeout)")
	private int result;
	
	@ApiModelProperty(value = "토큰 비허가 (토큰 만료) -> access토큰 만료되면 true를 반환")
	private boolean unauthorized;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
}
