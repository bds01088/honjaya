package com.ssafy.honjaya.db;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "ChatroomDto", description = "회원 정보")
@Data
public class ChatroomDto {
	@ApiModelProperty(value = "채팅방 번호, PK")
	private int chatroomNo;
	@ApiModelProperty(value = "채팅방 유저1")
	private int chatroomUser1;
	@ApiModelProperty(value = "채팅방 유저2")
	private int chatroomUser2;
}
