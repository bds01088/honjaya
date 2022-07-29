package com.ssafy.honjaya.db;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "Room", description = "게임방")
@Data
public class RoomDto {
	@ApiModelProperty(value = "방 번호, PK")
	private int roomNo;
	@ApiModelProperty(value = "방 참가 팀 수")
	private int roomPplTotal;
	@ApiModelProperty(value = "방 시작 시간")
	private String roomStartTime;
	
}
