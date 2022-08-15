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
@ApiModel(value = "EmailReq", description = "이메일 인증 코드 전송 Req")
public class EmailReq {
	@ApiModelProperty(value = "이메일")
	private String email;
	
	@ApiModelProperty(value = "인증 코드")
	private String code;
	
}
