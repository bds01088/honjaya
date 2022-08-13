package com.ssafy.honjaya.api.response;

import com.ssafy.honjaya.db.entity.ChatroomUser;
import com.ssafy.honjaya.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "ChatroomRes", description = "채팅방 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatroomRes {
	@ApiModelProperty(value = "채팅방 번호, PK")
	private long chatroomNo;
	
	@ApiModelProperty(value = "채팅방 상대방 유저")
	private int userNo;
	
	@ApiModelProperty(value = "채팅방 상대방 유저 닉네임")
	private String userNickname;
	
	@ApiModelProperty(value = "채팅방 상대방 유저 프로필 이미지 url")
	private String userProfilePicUrl;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;

	public ChatroomRes(ChatroomUser chatroomUser) {
		this.chatroomNo = chatroomUser.getChatroom().getChatroomNo();
		User user = chatroomUser.getUser();
		this.userNo = user.getUserNo();
		this.userNickname = user.getUserNickname();
		this.userProfilePicUrl = user.getUserProfilePicUrl();
	}
	
}
