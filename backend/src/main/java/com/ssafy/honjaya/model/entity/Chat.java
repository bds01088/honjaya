package com.ssafy.honjaya.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.sun.istack.NotNull;

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
@Entity
@Table(name="chat")
public class Chat {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="chat_no", nullable=false, updatable=false, columnDefinition="bigint")
	private long chatNo;
	
	@ManyToOne
	@JoinColumn(name="chatroom_no", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private Chatroom chatroom;
	
	@ManyToOne
	@JoinColumn(name="user_no", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User user;
	
	@Column(name="chat_message", length=1000)
	private String chatMessage;
	
	// 1234
}
