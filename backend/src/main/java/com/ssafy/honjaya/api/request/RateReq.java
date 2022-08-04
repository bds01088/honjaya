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
@ApiModel(value = "RateReq", description = "별점 Req")
public class RateReq {

	@ApiModelProperty(value = "별점 준 사람")
	private int rateFrom;

	@ApiModelProperty(value = "별점 받은 사람")
	private int rateTo;
	
	@ApiModelProperty(value = "별점")
	private double rateScore;
		
}
