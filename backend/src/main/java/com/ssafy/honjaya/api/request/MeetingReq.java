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
@ApiModel(value = "MeetingReq", description = "미팅 Req")
public class MeetingReq {
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	
	@ApiModelProperty(value = "2인 / 4인 (int: 2 / 4)")
	private int total;
	
	@ApiModelProperty(value = "역할 코드 (1:솔로 / 2:아바타 / 3:지시자 / 4:랜덤)")
	private int roleCode;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + userNo;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MeetingReq other = (MeetingReq) obj;
		if (userNo != other.userNo)
			return false;
		return true;
	}
}
