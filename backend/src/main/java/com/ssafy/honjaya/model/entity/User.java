package com.ssafy.honjaya.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
@Table(name="hashtag")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="hash_no", columnDefinition="char", length=5, nullable=false, updatable=false)
	private String hashNo;
	
	@ManyToOne
	@JoinColumn(name="user_no")
	private User user;
	
	@Column(name="hash_text", length=11, nullable=true, updatable=false)
	private String hashText;
	
}
