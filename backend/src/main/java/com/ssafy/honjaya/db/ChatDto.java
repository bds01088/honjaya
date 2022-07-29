package com.ssafy.honjaya.db;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "ChatDto", description = "회원 정보")
@Data
public class ChatDto {
	@ApiModelProperty(value = "채팅 번호, PK")
	private long chatNo;
	@ApiModelProperty(value = "채팅방 번호")
	private int chatroomNo;
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	@ApiModelProperty(value = "채팅 메시지")
	private String chatMessage;
	@ApiModelProperty(value = "채팅 시각")
	private String chatTime;
	@ApiModelProperty(value = "읽은 사람 수")
	private int chatRead;
}
