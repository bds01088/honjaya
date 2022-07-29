package com.ssafy.honjaya.db;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "HashTag", description = "해쉬태그")
@Data
public class HashTagDto {
	@ApiModelProperty(value = "해쉬태그 번호, PK")
	private int hashNo;
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	@ApiModelProperty(value = "해쉬태그 내용")
	private String hashText;
	
}
