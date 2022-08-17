package com.ssafy.honjaya.db.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

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
name="ban",
uniqueConstraints = {
		@UniqueConstraint(name="UK_BAN_USER_EMAIL", columnNames="ban_user_email"),
}
)
public class Ban {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="ban_no", nullable=false, updatable=false)
	private int banNo;
	
	@Column(name="ban_user_email", length=50, nullable=false, updatable=false)
	@NotNull
	private String banUserEmail;
	
	@Column(name="ban_term", nullable=false)
	@NotNull
	private int banTerm; // 며칠 밴, 0은 영구 정지
	
	@Column(name="ban_start_time", nullable=false, columnDefinition = "datetime")
	@NotNull
	private LocalDateTime banStartTime;
	
	@Column(name="ban_end_time", nullable=false, columnDefinition = "datetime")
	@NotNull
	private LocalDateTime banEndTime;
	
	@Column(name="ban_type", columnDefinition="char(3)")
	private String banType;
	
	@Column(name="ban_message", length=255)
	@NotNull
	private String banMessage;
}
