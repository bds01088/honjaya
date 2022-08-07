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
	@ApiModelProperty(value = "세션 아이디 (테스트용)")
	private String sessionId;
	
	@ApiModelProperty(value = "유저 번호")
	private int userNo;
	
	@ApiModelProperty(value = "유저 성별")
	private String userGnder;

	@ApiModelProperty(value = "2인 / 4인 (int: 2 / 4)")
	private int total;
	
	@ApiModelProperty(value = "이성만 (true / false)")
	private boolean oppositeGender;
	
	@ApiModelProperty(value = "역할 코드")
	private int roleCode;

	// hashMap을 구현하기 위한 hashCode와 euals. 나중에 userNo로 바꿀 예정
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((sessionId == null) ? 0 : sessionId.hashCode());
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
		if (sessionId == null) {
			if (other.sessionId != null)
				return false;
		} else if (!sessionId.equals(other.sessionId))
			return false;
		return true;
	}
}
