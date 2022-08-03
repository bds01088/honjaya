package com.ssafy.honjaya.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
@Table(
name="chat_ask",
uniqueConstraints = {
		@UniqueConstraint(name="UK_CHAT_ASK_USER", columnNames={"chat_ask_from", "chat_ask_to"})
}
)
public class ChatAsk {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="chat_ask_no", nullable=false, updatable=false) // columnDefinition="char",
	private int chatAskNo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="chat_ask_from", nullable=false, updatable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User chatAskFrom;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="chat_ask_to", nullable=false, updatable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User chatAskTo;
	
}
