package com.ssafy.honjaya.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

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
@Table(name="room")
public class Room {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="room_no", nullable=false, updatable=false)
	private int roomNo;
	
	@Column(name="room_ppl_total", nullable=false, updatable=false, columnDefinition = "int CHECK (room_ppl_total in (2,4))")
	@NotNull
	private int roomPplTotal;
	
	@Column(name="room_start_time", updatable=false, columnDefinition = "datetime")
	private LocalDateTime roomStartTime;
	
	@PrePersist
	public void createdAt() {
		this.roomStartTime = LocalDateTime.now();
	}
}
