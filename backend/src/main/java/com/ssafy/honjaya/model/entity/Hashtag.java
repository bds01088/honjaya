package com.ssafy.honjaya.model.entity;

import javax.persistence.CascadeType;
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
//@Table(
//name="student",
//uniqueConstraints = {
//		@UniqueConstraint(name="UK_STUDENT_EMAIL", columnNames="email")
//}
//)
public class Hashtag {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="hash_no", nullable=false, updatable=false) // columnDefinition="char", -> 이건 뭐더라?
	private int hashNo;
	
	@ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name="user_no", nullable=false)
	private User user;
	
	@Column(name="hash_text", length=11, nullable=false)
	private String hashText;
	
}
