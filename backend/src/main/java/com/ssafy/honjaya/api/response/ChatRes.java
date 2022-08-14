package com.ssafy.honjaya.api.response;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import com.ssafy.honjaya.db.entity.Chat;
import com.ssafy.honjaya.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(value = "ChatRes", description = "채팅 Res")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatRes {
	@ApiModelProperty(value = "보낸 사람 유저 번호")
	private int userNo;
	
	@ApiModelProperty(value = "보낸 사람 유저 닉네임")
	private String userNickname;
	
	@ApiModelProperty(value = "보낸 사람 프로필 이미지")
	private String userProfilePicUrl;
	
	@ApiModelProperty(value = "채팅 메시지")
	private String chatMessage;
	
	@ApiModelProperty(value = "채팅 시각")
	private String chatTime;
	
	@ApiModelProperty(value = "읽은 사람 수")
	private int chatRead;
	
	@ApiModelProperty(value = "성공 여부 (boolean)")
	private boolean success;
	
	@ApiModelProperty(value = "에러 메시지")
	private String error;

	public ChatRes(Chat chat) {
		User user = chat.getUser();
		this.userNo = user.getUserNo();
		this.userNickname = user.getUserNickname();
		this.userProfilePicUrl = user.getUserProfilePicUrl();
		this.chatMessage = chat.getChatMessage();
		this.chatTime = datetimeToChatTime(chat.getChatTime());
		this.chatRead = chat.getChatRead();
	}
	
	private String datetimeToChatTime(LocalDateTime t) {
		LocalDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
		String chatDay = "";
		String chatTime = t.format(DateTimeFormatter.ofPattern("a h:mm").withLocale(Locale.forLanguageTag("ko")));
		if (t.getYear() != now.getYear()) {
			chatDay += t.getYear() + ". ";
		} else if (t.getDayOfYear() == now.getDayOfYear()) {
			return chatTime;
		}
		return chatDay + t.getMonthValue() + ". " + t.getDayOfMonth() + ". " + chatTime;
	}
	
}
