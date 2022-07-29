package com.ssafy.honjaya.api.request;

import javax.validation.constraints.Size;

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
@ApiModel(value = "ChatReq", description = "채팅 Req")
public class ChatReq {
	@ApiModelProperty(value = "채팅방 번호")
	private int chatroomNo;
	
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	
	@ApiModelProperty(value = "채팅 메시지")
	@Size(min = 1, max = 1000, message = "1자 이상, 1000자 이하의 메시지만 입력하세요")
	private String chatMessage;
	
}
