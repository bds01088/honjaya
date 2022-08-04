package com.ssafy.honjaya.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value = "ChatroomReq", description = "채팅방 Req")
public class ChatroomReq {
	@ApiModelProperty(value = "채팅방 신청 유저")
	private int chatroomFrom;
	
	@ApiModelProperty(value = "채팅방 수락 유저")
	private int chatroomTo;
	
}
