package com.ssafy.honjaya.db;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "RoomUser", description = "게임방에 있는 유저")
@Data
public class RoomUserDto {
	@ApiModelProperty(value = "방-유저 번호, PK")
	private int roomUserNo;
	@ApiModelProperty(value = "방 번호")
	private int roomNo;
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	@ApiModelProperty(value = "유저 역할 코드")
	private String roomUserRoleCode;
	
}
