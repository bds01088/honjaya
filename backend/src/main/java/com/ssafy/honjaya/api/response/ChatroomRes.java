package com.ssafy.honjaya.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "ChatroomRes", description = "채팅방 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatroomRes {
	@ApiModelProperty(value = "채팅방 번호, PK")
	private int chatroomNo;
	
	@ApiModelProperty(value = "채팅방 상대방 유저")
	private int userNo;
	
	@ApiModelProperty(value = "채팅방 상대방 유저 닉네임")
	private String userNickname;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
}
