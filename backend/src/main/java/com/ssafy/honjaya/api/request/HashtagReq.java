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
@ApiModel(value = "HashtagReq", description = "해시태그 Req")
public class HashtagReq {
	@ApiModelProperty(value = "해시태그 주인")
	private int userNo;
	
	@ApiModelProperty(value = "해시태그 내용")
	@Size(min = 1, max = 11)
	private String hashText;
}
