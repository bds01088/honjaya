package com.ssafy.honjaya.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
	@Column(name="hash_no", nullable=false, updatable=false) // columnDefinition="char",
	private int hashNo;
	
	@ManyToOne
	@JoinColumn(name="user_no", nullable=false, updatable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User user;
	
	@Column(name="hash_text", length=11, nullable=false, updatable=false) // 해쉬태그는 insert, delete만
	@NotNull
	private String hashText;
	
}
