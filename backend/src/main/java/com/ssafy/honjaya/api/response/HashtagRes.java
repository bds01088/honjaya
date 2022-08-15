package com.ssafy.honjaya.api.response;

import com.ssafy.honjaya.db.entity.Hashtag;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "HashtagRes", description = "해시태그 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HashtagRes {
	@ApiModelProperty(value = "해시태그 번호, PK")
	private int hashNo;
	
	@ApiModelProperty(value = "해시태그 내용")
	private String hashText;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;

	public HashtagRes(Hashtag hashtag) {
		this.hashNo = hashtag.getHashNo();
		this.hashText = hashtag.getHashText();
	}
}
