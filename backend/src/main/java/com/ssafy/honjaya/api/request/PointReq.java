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
@ApiModel(value = "PointReq", description = "포인트 Req")
public class PointReq {
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	
	@ApiModelProperty(value = "증감 포인트 (사용일 경우 음수, 리워드일 경우 양수)")
	private int point;
}
