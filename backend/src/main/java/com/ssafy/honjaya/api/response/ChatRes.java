package com.ssafy.honjaya.api.response;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import com.ssafy.honjaya.db.entity.Chat;

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
	@ApiModelProperty(value = "자신이 보낸 메시지 true / 상대 메시지 false")
	private boolean myChat;
	
	@ApiModelProperty(value = "보낸 사람 유저 번호")
	private int userNo;
	
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

	public ChatRes(int userNo, Chat chat) {
		int chatUserNo = chat.getUser().getUserNo();
		this.myChat = chatUserNo == userNo;
		this.userNo = chatUserNo;
		this.chatMessage = chat.getChatMessage();
		this.chatTime = datetimeToChatTime(chat.getChatTime());
		this.chatRead = chat.getChatRead();
	}
	
	private String datetimeToChatTime(LocalDateTime t) {
		LocalDateTime now = LocalDateTime.now();
		String chatDay = "";
		String chatTime = t.format(DateTimeFormatter.ofPattern("a h:mm").withLocale(Locale.forLanguageTag("ko")));
		if (t.getYear() != now.getYear()) {
			chatDay += t.getYear() + "년 ";
		} else if (t.getDayOfYear() == now.getDayOfYear()) {
			return chatTime;
		}
		return chatDay + t.getMonth() + "월 " + t.getDayOfMonth() + "일 " + chatTime;
	}
	
}
