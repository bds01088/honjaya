package com.ssafy.honjaya.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

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
	
	@Column(name="user_email", length=50, updatable=false)
	@NotNull
	private String userEmail;
	
	@Column(name="user_password", length=16)
	@NotNull
	private String userPassword;
	
	@Column(name="user_nickname", length=20)
	@NotNull
	private String userNickname;
	
	@Column(name="user_name", length=20)
	private String userName;
	
	@Column(name="user_birthday")
	private java.sql.Date userBirthday;
	
	@Column(name="user_gender", columnDefinition = "char(1) CHECK (user_gender in ('m', 'f'))")
	private String userGender; // "m" or "f"
	
	@Column(name="user_phone", length=45)
	private String userPhone;
	
	@Column(name="user_profile_pic_url", length=255)
	private String userProfilePicUrl;
	
	@Column(name="user_reg_time")
	private LocalDateTime userRegTime;
	
	@Column(name="user_point", columnDefinition = "int CHECK (user_point >= 0)")
	private int userPoint;
	
	@Column(name="user_token", length=1000)
	private String userToken;
	
	@PrePersist
    public void createdAt() {
        this.userRegTime = LocalDateTime.now();
    }
}
