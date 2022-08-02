package com.ssafy.honjaya.api.response;

import com.ssafy.honjaya.db.entity.Ban;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "BanRes", description = "이용 정지 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BanRes {
	@ApiModelProperty(value = "정지 해제 날짜")
	private String banEndTime;
	
	@ApiModelProperty(value = "정지 일 수")
	private int banTerm;
	
	@ApiModelProperty(value = "정지 메시지")
	private String banMessage;

	public BanRes(Ban ban) {
		this.banEndTime = ban.getBanEndTime().toString();
		this.banTerm = ban.getBanTerm();
		this.banMessage = ban.getBanMessage();
	}
}
