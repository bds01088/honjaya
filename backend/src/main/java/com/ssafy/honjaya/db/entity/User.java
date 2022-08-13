package com.ssafy.honjaya.db.entity;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.ColumnDefault;

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
name="user",
uniqueConstraints = {
		@UniqueConstraint(name="UK_USER_EMAIL", columnNames="user_email"),
		@UniqueConstraint(name="UK_USER_NICKNAME", columnNames="user_nickname")
}
)
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="user_no", nullable=false, updatable=false)
	private int userNo;
	
	@Column(name="user_email", length=50, nullable=false, updatable=false)
	@NotNull
	private String userEmail;
	
	@Column(name="user_password", length=16, nullable=false)
	@NotNull
	private String userPassword;
	
	@Column(name="user_nickname", length=10, nullable=false)
	@NotNull
	private String userNickname;
	
	@Column(name="user_name", length=30)
	private String userName;
	
	@Column(name="user_birthday")
	private java.sql.Date userBirthday;
	
	@Column(name="user_gender", nullable=false, columnDefinition = "char(1) CHECK (user_gender in ('m', 'f'))")
	@ColumnDefault("'m'")
	private String userGender; // "m" or "f"
	
	@Column(name="user_phone", length=45)
	private String userPhone;
	
	@Column(name="user_profile_pic_url", length=255)
	private String userProfilePicUrl;
	
	@Column(name="user_reg_time", updatable=false, columnDefinition = "datetime")
	private LocalDateTime userRegTime;
	
	@Column(name="user_point", nullable=false, columnDefinition = "int CHECK (user_point >= 0)")
	@ColumnDefault("0")
	private int userPoint;
	
	@Column(name="user_token", length=1000)
	private String userToken;
	
//	@OneToMany(orphanRemoval=true, cascade=CascadeType.REMOVE, mappedBy="user")
//	private List<Hashtag> hashtags;
	
	@PrePersist
	public void createdAt() {
		this.userRegTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
//		ZonedDateTime nowUTC = ZonedDateTime.now(ZoneId.of("UTC"));
//		LocalDateTime nowSeoul = nowUTC.withZoneSameInstant(ZoneId.of("Asia/Seoul")).toLocalDateTime();
//		this.userRegTime = nowSeoul;
	}
}
