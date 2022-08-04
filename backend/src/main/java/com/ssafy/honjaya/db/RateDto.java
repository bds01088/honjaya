package com.ssafy.honjaya.db;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@ApiModel(value = "Rate", description = "별점")
@Data
public class RateDto {
	@ApiModelProperty(value = "별점 번호, PK")
	private int rateNo;
	@ApiModelProperty(value = "별점 준 사람")
	private int rateFrom;
	@ApiModelProperty(value = "별점 받은 사람")
	private int rateTo;
	@ApiModelProperty(value = "별점")
	private double rateScore;
	
}
