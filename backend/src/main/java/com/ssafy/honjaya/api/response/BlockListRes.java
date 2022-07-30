package com.ssafy.honjaya.api.response;

import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "BlockListRes", description = "회원 차단 리스트 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BlockListRes {
	@ApiModelProperty(value = "차단 회원 리스트")
	List<BlockRes> list;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
}
