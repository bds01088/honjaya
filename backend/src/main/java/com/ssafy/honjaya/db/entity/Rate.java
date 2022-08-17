package com.ssafy.honjaya.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
name="rate",
uniqueConstraints = {
		@UniqueConstraint(name="UK_RATE_FROM_TO", columnNames={"rate_from", "rate_to"})
}
)
public class Rate {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY) // AutoIncrement
	@Column(name="rate_no", nullable=false, updatable=false)
	private int rateNo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="rate_from", nullable=false, updatable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User rateFrom;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="rate_to", nullable=false, updatable=false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@NotNull
	private User rateTo;
	
	@Column(name="rate_score", nullable=false, columnDefinition = "decimal(2,1)")
	@NotNull
	private double rateScore;
	
}
