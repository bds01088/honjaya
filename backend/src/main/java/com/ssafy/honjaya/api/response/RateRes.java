package com.ssafy.honjaya.api.response;

import com.ssafy.honjaya.db.entity.Rate;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "RateRes", description = "회원 별점 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RateRes {
	@ApiModelProperty(value = "별점 번호, PK")
	private int rateNo;
	
	@ApiModelProperty(value = "별점 준 사람")
	private int rateFrom;
	
	@ApiModelProperty(value = "별점 받은 사람")
	private int rateTo;
	
	@ApiModelProperty(value = "별점")
	private double rateScore;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;

	public RateRes(Rate rate) {
		this.rateNo = rate.getRateNo();
		this.rateFrom = rate.getRateFrom().getUserNo();
		this.rateTo = rate.getRateTo().getUserNo();
		this.rateScore = rate.getRateScore();
	}
	
}
