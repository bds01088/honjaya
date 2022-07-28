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
@Table(name="ban")
public class Ban {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="ban_no", nullable=false, updatable=false) // columnDefinition="char",
	private int banNo;
	
	@Column(name="ban_user_email", length=50, nullable=false, updatable=false)
	@NotNull
	private String banUserEmail;
	
	@Column(name="ban_term", nullable=false)
	@NotNull
	private int banTerm; // 며칠 밴, 0은 영구 정지
	
	@Column(name="ban_start_time", nullable=false, updatable=false, columnDefinition = "datetime")
	@NotNull
	private LocalDateTime banStartTime;
	
	@Column(name="ban_end_time", columnDefinition = "datetime")
	private LocalDateTime banEndTime;
	
	@Column(name="ban_type", columnDefinition="char(3)")
	private String banType;
	
	@Column(name="ban_message", length=255)
	@NotNull
	private String banMessage;
	
	@PrePersist
	public void createdAt() {
		this.banStartTime = LocalDateTime.now();
		if (this.banTerm != 0) {
			this.banEndTime = this.banStartTime.plusDays(this.banTerm);
		}
	}
}
