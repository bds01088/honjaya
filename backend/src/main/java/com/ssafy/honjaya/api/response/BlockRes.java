package com.ssafy.honjaya.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "BlockRes", description = "회원 차단 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BlockRes {
	@ApiModelProperty(value = "차단목록 번호, PK")
	private int blockNo;
	
	@ApiModelProperty(value = "차단 당한 사람 닉네임")
	private String blockNickname;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
}
