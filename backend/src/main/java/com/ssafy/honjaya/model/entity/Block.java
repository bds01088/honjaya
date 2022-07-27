package com.ssafy.honjaya.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
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
name="block",
uniqueConstraints = {
		@UniqueConstraint(name="UK_BLOCK_FROM_TO", columnNames={"block_from", "block_to"})
}
)
public class Block {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="block_no", nullable=false, updatable=false) // columnDefinition="char",
	private int blockNo;
	
	@ManyToOne
	@JoinColumn(name="block_from", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User blockFrom;
	
	@ManyToOne
	@JoinColumn(name="block_to", nullable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User blockTo;
	
}
