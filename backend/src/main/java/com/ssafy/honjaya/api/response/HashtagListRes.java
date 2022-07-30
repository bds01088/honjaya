package com.ssafy.honjaya.api.response;

import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "HashtagListRes", description = "해시태그 리스트 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HashtagListRes {
	@ApiModelProperty(value = "해시태그 리스트")
	List<HashtagRes> list;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;
	
}
