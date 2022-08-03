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
@ApiModel(value = "ChatAskReq", description = "채팅 신청 Req")
public class ChatAskReq {

	@ApiModelProperty(value = "채팅 신청한 사람")
	private int chatAskFrom;

	@ApiModelProperty(value = "채팅 신청 받은 사람")
	private int chatAskTo;
		
}
