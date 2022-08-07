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
	@ApiModelProperty(value = "미팅방 UUID (테스트)")
	private String uuid;
	
	@ApiModelProperty(value = "세션 ID (테스트)")
	private String sessionId;
	
	@ApiModelProperty(value = "미팅방 번호")
	private int roomNo;
	
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	
	@ApiModelProperty(value = "Pair(아바타-지시자) 유저 번호")
	private int pairUserNo;
	
	@ApiModelProperty(value = "응답 결과 (1:성공 / 0:취소 / -1:timeout)")
	private int result;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
}
