package com.ssafy.honjaya.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
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
@Table(
name="ready_queue",
uniqueConstraints = {
		@UniqueConstraint(name="UK_READY_QUEUE_USER", columnNames="user_no")
}
)
public class ReadyQueue {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="queue_no", nullable=false, updatable=false)
	private int queueNo;
	
	@ManyToOne
	@JoinColumn(name="user_no", nullable=false, updatable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User user;
	
	@Column(name="queue_start_time", nullable=false, updatable=false, columnDefinition="datetime(6)")
	@NotNull
	private LocalDateTime queueStartTime;
	
	@Column(name="queue_user_role_code", nullable=false, columnDefinition="char(3)")
	@NotNull
	private String queueUserRoleCode;
	
	@ManyToOne
	@JoinColumn(name="queue_pair_user_no", nullable=true)
	private User queuePairUserNo;
	
	@Column(name="queue_temp_room_code", length=100)
	private String queueTempRoomCode;
	
	@PrePersist
	public void createdAt() {
		this.queueStartTime = LocalDateTime.now();
	}
}
