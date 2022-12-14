package com.ssafy.honjaya.db.entity;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="chat")
public class Chat {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="chat_no", nullable=false, updatable=false, columnDefinition="bigint")
	private long chatNo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="chatroom_no", nullable=false, updatable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private Chatroom chatroom;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_no", nullable=false, updatable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User user;
	
	@Column(name="chat_message", length=1000, updatable=false)
	private String chatMessage;
	
	@Column(name="chat_time", updatable=false, columnDefinition = "datetime(6)")
	private LocalDateTime chatTime;
	
	@Column(name="chat_read")
	private int chatRead;
	
	@PrePersist
	public void createdAt() {
		this.chatTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
	}
}
