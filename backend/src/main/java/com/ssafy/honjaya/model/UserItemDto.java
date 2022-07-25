package com.ssafy.honjaya.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "UserItem", description = "유저가 가진 아이템 정보")
@Data
public class UserItemDto {
	@ApiModelProperty(value = "유저-아이템 번호, PK")
	private int userItemNo;
	@ApiModelProperty(value = "아이템 번호")
	private int itemNo;
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	@ApiModelProperty(value = "아이템 개수")
	private int itemCount;
	
}
