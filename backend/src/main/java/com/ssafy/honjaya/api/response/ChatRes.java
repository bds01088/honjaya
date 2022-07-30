package com.ssafy.honjaya.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "ChatRes", description = "채팅 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatRes {
	@ApiModelProperty(value = "자신이 보낸 메시지 true / 상대 메시지 false")
	private boolean myChat;
	
	@ApiModelProperty(value = "채팅 메시지")
	private String chatMessage;
	
	@ApiModelProperty(value = "채팅 시각")
	private String chatTime;
	
	@ApiModelProperty(value = "읽은 사람 수")
	private int chatRead;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
}
